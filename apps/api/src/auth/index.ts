import { Hono } from "hono";
import { getDidFromHandleOrDid } from "@cookware/lexicons";
import { getClient } from "./client.js";
import { z } from "zod";
import { Session } from "hono-sessions";
import { RecipesSession, getSessionAgent } from "../util/api.js";

export const authApp = new Hono<{
  Variables: {
    session: Session<RecipesSession>,
    session_key_rotation: boolean,
  },
}>();

authApp.get('/client-metadata.json', async ctx => {
  const client = await getClient(ctx);
  return ctx.json(client.clientMetadata);
});

authApp.get('/jwks.json', async ctx => {
  const client = await getClient(ctx);
  return ctx.json(client.jwks);
});

const loginSchema = z.object({
  actor: z.string(),
});

authApp.get('/me', async ctx => {
  const agent = await getSessionAgent(ctx);
  if (!agent) {
    ctx.status(401);
    return ctx.json({
      error: 'unauthenticated',
      message: 'You must be authenticated to access this resource.',
    });
  }

  const profile = await agent.getProfile({ actor: agent.did! });
  return ctx.json(profile.data);
});

authApp.post('/login', async ctx => {
  const client = await getClient(ctx);
  const { actor } = loginSchema.parse(await ctx.req.raw.json());

  const did = await getDidFromHandleOrDid(actor);
  if (!did) {
    ctx.status(400);
    return ctx.json({
      error: 'DID_NOT_FOUND' as const,
      message: 'No account with that handle was found.',
    });
  }

  const url = await client.authorize(did, {
    scope: 'atproto transition:generic',
  });
  return ctx.json({ url });
});

authApp.get('/callback', async ctx => {
  const client = await getClient(ctx);
  const params = new URLSearchParams(ctx.req.url.split('?')[1]);

  const { session } = await client.callback(params);
  const currentSession = ctx.get('session') as Session<RecipesSession>;
  const did = currentSession.get('did');
  if (did) {
    ctx.status(400);
    return ctx.json({
      error: 'session_exists',
      message: 'Session already exists!',
    });
  }

  currentSession.set('did', session.did);

  return ctx.redirect('/');
});
