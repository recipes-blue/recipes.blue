import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { rootLogger } from "./logger.js";
import env from "./config/env.js";
import { xrpcApp } from "./xrpc/index.js";
import { cors } from "hono/cors";
import { authApp } from "./auth/index.js";
import { ZodError } from "zod";
import { CookieStore, Session, sessionMiddleware } from "hono-sessions";
import { CookwareSession } from "./util/api.js";
import * as Sentry from "@sentry/node"
import { readFileSync } from "fs";
import { getFilePathWithoutDefaultDocument } from "hono/utils/filepath";
import { recipeApp } from "./recipes/index.js";

if (env.SENTRY_DSN) {
  Sentry.init({
    dsn: env.SENTRY_DSN,
  });
}

const app = new Hono<{
  Variables: {
    session: Session<CookwareSession>,
    session_key_rotation: boolean,
  },
}>();

const store = new CookieStore({
  sessionCookieName: 'cookware-session',
});

app.use(async (c, next) => {
  if (
    c.req.path == '/oauth/client-metadata.json'
    || c.req.path == '/oauth/jwks.json'
  ) return next();

  const mw = sessionMiddleware({
    store,
    encryptionKey: env.SESSION_KEY, // Required for CookieStore, recommended for others
    expireAfterSeconds: 900, // Expire session after 15 minutes of inactivity
    cookieOptions: {
      sameSite: 'strict', // Recommended for basic CSRF protection in modern browsers
      path: '/', // Required for this library to work properly
      httpOnly: true, // Recommended to avoid XSS attacks
      secure: true,
    },
  });
  return mw(c, next);
});

app.use(cors({
  origin: (origin, _ctx) => {
    if (env.ENV == 'development') {
      const host = _ctx.req.header('Host');
      console.log(`https://${host}`);
      return `https://${host}`;
    }
    return env.CORS_ORIGINS.includes(origin)
      ? origin
      : 'https://cookware.hayden.moe';
  },
  allowHeaders: ['Content-Type', 'Accept'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}));

app.route('/xrpc', xrpcApp);
app.route('/oauth', authApp);
app.route('/api/recipes', recipeApp);

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    if (e instanceof ZodError) {
      ctx.status(400);
      return ctx.json({
        error: 'invalid_data',
        message: e.message,
      });
    }

    ctx.status(500);
    return ctx.json({
      error: 'internal_server_error',
      message: 'The server could not process the request.',
    });
  }
});

// TODO: Replace custom impl with this when issue is addressed:
//   https://github.com/honojs/hono/issues/3736
// app.use('/*', serveStatic({ root: env.PUBLIC_DIR, rewriteRequestPath: () => 'index.html' }));

app.use('/*', async (ctx, next) => {
  if (ctx.finalized) return next();

  let path = getFilePathWithoutDefaultDocument({
    filename: 'index.html',
    root: env.PUBLIC_DIR,
  })

  if (path) {
    path = `./${path}`;
  } else {
    return next();
  }

  const index = readFileSync(path).toString();
  return ctx.html(index);
});

serve({
  fetch: app.fetch,
  hostname: env.HOST,
  port: env.PORT,
}).on('listening', () => {
  rootLogger.info({ port: 8080, host: '0.0.0.0' }, 'Server booted.');
});
