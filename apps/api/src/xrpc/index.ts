import { Hono } from 'hono';
import { db, recipeTable } from '@cookware/database';
import { and, desc, eq, sql } from 'drizzle-orm';
import { DID, getDidFromHandleOrDid } from '@cookware/lexicons';
import { simpleFetchHandler, XRPC } from '@atcute/client';
import { BlueRecipesFeedDefs, BlueRecipesFeedGetRecipes } from '@atcute/client/lexicons';
import { getAuthorInfo } from '../util/api.js';

export const xrpcApp = new Hono();

xrpcApp.get('/blue.recipes.feed.getRecipes', async ctx => {
  const { did: didQuery } = ctx.req.query();

  let did: DID | null = null;
  if (didQuery)
    did = await getDidFromHandleOrDid(didQuery);

  const recipes = await db
    .select({
      rkey: recipeTable.rkey,
      title: recipeTable.title,
      description: recipeTable.description,
      time: recipeTable.time,
      serves: recipeTable.serves,
      ingredientsCount: sql`json_array_length(${recipeTable.ingredients})`,
      stepsCount: sql`json_array_length(${recipeTable.steps})`,
      createdAt: recipeTable.createdAt,
      authorDid: recipeTable.authorDid,
      imageRef: recipeTable.imageRef,
      uri: sql`concat(${recipeTable.authorDid}, "/", ${recipeTable.rkey})`.as('uri'),
    })
    .from(recipeTable)
    .where(did ? eq(recipeTable.authorDid, did) : undefined)
    .orderBy(desc(recipeTable.createdAt));

  const rpc = new XRPC({
    handler: simpleFetchHandler({
      service: 'https://public.api.bsky.app',
    }),
  });

  let authorInfo: BlueRecipesFeedDefs.AuthorInfo | null = null;
  if (did) {
    authorInfo = await getAuthorInfo(did, rpc);
  };

  const results = [];
  const eachRecipe = async (r: typeof recipes[0]) => ({
    author: authorInfo || await getAuthorInfo(r.authorDid, rpc),
    rkey: r.rkey,
    title: r.title,
    time: r.time,
    serves: r.serves,
    description: r.description || undefined,
    ingredients: r.ingredientsCount as number,
    steps: r.stepsCount as number,
    imageUrl: r.imageRef
      ? `https://cdn.bsky.app/img/feed_thumbnail/plain/${r.authorDid}/${r.imageRef}@jpeg`
      : null,
  });

  for (const result of recipes) {
    results.push(await eachRecipe(result));
  }

  let result: BlueRecipesFeedGetRecipes.Output = {
    author: authorInfo || undefined,
    recipes: results,
  };

  return ctx.json(result);
});

xrpcApp.get('/blue.recipes.feed.getRecipe', async ctx => {
  const { did, rkey } = ctx.req.query();
  if (!did) throw new Error('Invalid DID');
  if (!rkey) throw new Error('Invalid rkey');

  let parsedDid = await getDidFromHandleOrDid(did);
  if (!parsedDid) {
    ctx.status(404);
    return ctx.json({
      error: 'invalid_did',
      message: 'No such author was found by that identifier.',
    });
  }

  const recipe = await db.query.recipeTable.findFirst({
    where: and(
      eq(recipeTable.authorDid, parsedDid),
      eq(recipeTable.rkey, rkey),
    ),
  });

  if (!recipe) {
    ctx.status(404);
    return ctx.json({
      error: 'not_found',
      message: 'No such recipe was found in the index.',
    });
  }

  const rpc = new XRPC({
    handler: simpleFetchHandler({
      service: 'https://public.api.bsky.app',
    }),
  });

  const authorInfo = await getAuthorInfo(recipe.authorDid, rpc);

  return ctx.json({
    recipe: {
      author: authorInfo,
      title: recipe.title,
      time: recipe.time,
      serves: recipe.serves,
      description: recipe.description,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      imageUrl: recipe.imageRef
        ? `https://cdn.bsky.app/img/feed_thumbnail/plain/${recipe.authorDid}/${recipe.imageRef}@jpeg`
        : null,
    },
  });
});
