import { Hono } from "hono";
import { getSessionAgent } from "../util/api.js";
import { RecipeCollection, RecipeRecord } from "@cookware/lexicons";
import { TID } from "@atproto/common";

export const recipeApp = new Hono();

recipeApp.post('/', async ctx => {
  const agent = await getSessionAgent(ctx);
  if (!agent) {
    ctx.status(401);
    return ctx.json({
      error: 'unauthenticated',
      message: 'You must be authenticated to access this resource.',
    });
  }

  const body = await ctx.req.json();
  const { data: record, success, error } = RecipeRecord.safeParse(body);
  if (!success) {
    ctx.status(400);
    return ctx.json({
      error: 'invalid_recipe',
      message: error.message,
      fields: error.formErrors,
    });
  }

  const res = await agent.com.atproto.repo.putRecord({
    repo: agent.assertDid,
    collection: RecipeCollection,
    record: record,
    rkey: TID.nextStr(),
    validate: false,
  });

  return ctx.json(res.data);
});
