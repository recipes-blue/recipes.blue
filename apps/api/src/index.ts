import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { rootLogger } from "./logger.js";
import env from "./config/env.js";
import { xrpcApp } from "./xrpc/index.js";
import { cors } from "hono/cors";
import { ZodError } from "zod";
import * as Sentry from "@sentry/node"
import { recipeApp } from "./recipes/index.js";

if (env.SENTRY_DSN) {
  Sentry.init({
    dsn: env.SENTRY_DSN,
  });
}

const app = new Hono();

app.use(cors({
  origin: (origin, _ctx) => {
    if (env.ENV == 'development') {
      const host = _ctx.req.header('Host');
      console.log(`https://${host}`);
      return `https://${host}`;
    }
    return env.CORS_ORIGINS.includes(origin)
      ? origin
      : 'https://recipes.blue';
  },
  allowHeaders: ['Content-Type', 'Accept'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}));

app.route('/xrpc', xrpcApp);
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

serve({
  fetch: app.fetch,
  hostname: env.HOST,
  port: env.PORT,
}).on('listening', () => {
  rootLogger.info({ port: 8080, host: '0.0.0.0' }, 'Server booted.');
});
