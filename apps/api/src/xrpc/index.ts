import { Hono } from 'hono';
import { db, recipeTable } from '@cookware/database';
import { and, desc, eq, sql } from 'drizzle-orm';
import { DID, getDidDoc, getDidFromHandleOrDid } from '@cookware/lexicons';

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
      ingredientsCount: sql`json_array_length(${recipeTable.ingredients})`,
      stepsCount: sql`json_array_length(${recipeTable.steps})`,
      createdAt: recipeTable.createdAt,
      authorDid: recipeTable.authorDid,
      uri: sql`concat(${recipeTable.authorDid}, "/", ${recipeTable.rkey})`.as('uri'),
    })
    .from(recipeTable)
    .where(did ? eq(recipeTable.authorDid, did) : undefined)
    .orderBy(desc(recipeTable.createdAt));

  const results = [];
  const eachRecipe = async (r: typeof recipes[0]) => ({
    author: await (async () => {
      const author = await getDidDoc(r.authorDid);
      return author.alsoKnownAs[0]?.substring(5);
    })(),
    rkey: r.rkey,
    did: r.authorDid,
    title: r.title,
    description: r.description,
    ingredients: r.ingredientsCount,
    steps: r.stepsCount ,
  });

  for (const result of recipes) {
    results.push(await eachRecipe(result));
  }

  return ctx.json({
    recipes: results,
  });
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

  const author = await getDidDoc(recipe.authorDid);

  return ctx.json({
    recipe: {
      author: {
        handle: author.alsoKnownAs[0]?.substring(5),
      },
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
    },
  });
});

xrpcApp.use(async c => {
  c.status(400);
  return c.json({
    error: 'not_implemented',
    message: 'The XRPC server has not yet been implemented.',
  });
});
