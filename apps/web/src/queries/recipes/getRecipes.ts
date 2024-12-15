import { resolveHandle } from "@/lib/auth/handle";
import { db, recipeTable } from "@cookware/database";
import { gt, and, eq, asc } from "drizzle-orm";

export const getRecipe = async (actor: string, rkey: string) => {
  const did = await resolveHandle(actor);

  const res = await db.query.recipeTable.findFirst({
    where: and(eq(recipeTable.authorDid, did), eq(recipeTable.rkey, rkey)),
  });

  return res;
};

export const getRecipes = async (cursor?: number, pageSize = 15) => {
  const res = await db
    .select()
    .from(recipeTable)
    .where(cursor ? gt(recipeTable.id, cursor) : undefined)
    .limit(pageSize)
    .orderBy(asc(recipeTable.id));

  return res;
};
