import { Context } from "hono";
import { Session } from "hono-sessions";
import { getClient } from "../auth/client.js";
import { Agent } from "@atproto/api";
import { authLogger } from "../logger.js";

export type RecipesSession = { did: string; };

export const getSessionAgent = async (ctx: Context) => {
  const client = await getClient(ctx);
  const session = ctx.get('session') as Session<RecipesSession>;
  const did = session.get('did');
  if (!did) return null;

  try {
    const oauthSession = await client.restore(did);
    return oauthSession ? new Agent(oauthSession) : null;
  } catch (err) {
    authLogger.warn({ err, did }, 'oauth restore failed');
    session.deleteSession();
    return null;
  }
};
