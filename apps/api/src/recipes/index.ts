import { Hono } from "hono";
import { getDidDoc, getPdsUrl, RecipeCollection, RecipeRecord } from "@cookware/lexicons";
import { TID } from "@atproto/common";
import { verifyJwt } from "../util/jwt.js";
import { XRPCError } from "../util/xrpc.js";

export const recipeApp = new Hono();

recipeApp.post('/', async ctx => {
  const authz = ctx.req.header('Authorization');
  if (!authz || !authz.startsWith('Bearer ')) {
    throw new XRPCError('this endpoint requires authentication', 'authz_required', 401);
  }

  try {
    const serviceJwt = await verifyJwt(
      authz.split(' ')[1]!,
      'did:web:recipes.blue#api',
      null,
      async (iss, forceRefresh) => {
        console.log(iss);
        return '';
      },
    );
  } catch(e) {
    if (e instanceof XRPCError) return e.hono(ctx);
    throw e;
  }

  //const agent = await getSessionAgent(ctx);
  //if (!agent) {
  //  ctx.status(401);
  //  return ctx.json({
  //    error: 'unauthenticated',
  //    message: 'You must be authenticated to access this resource.',
  //  });
  //}
  //
  //const body = await ctx.req.json();
  //const { data: record, success, error } = RecipeRecord.safeParse(body);
  //if (!success) {
  //  ctx.status(400);
  //  return ctx.json({
  //    error: 'invalid_recipe',
  //    message: error.message,
  //    fields: error.formErrors,
  //  });
  //}
  //
  //const res = await agent.com.atproto.repo.putRecord({
  //  repo: agent.assertDid,
  //  collection: RecipeCollection,
  //  record: record,
  //  rkey: TID.nextStr(),
  //  validate: false,
  //});
  //
  //return ctx.json(res.data);
});
