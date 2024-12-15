import { resolveHandle } from "@/lib/auth/handle";
import { db, recipeTable } from "@cookware/database";
import { gt, and, eq, asc } from "drizzle-orm";

export const getRecipe = async (actor: string, rkey: string) => {
  const did = await resolveHandle(decodeURIComponent(actor));

  const res = await db.query.recipeTable.findFirst({
    where: and(eq(recipeTable.authorDid, did), eq(recipeTable.rkey, rkey)),
  });

  return res;
};

export const getRecipes = async (cursor?: number, author?: string, pageSize = 15) => {
  const res = await db
    .select()
    .from(recipeTable)
    .where(
      author
        ? and(
          eq(recipeTable.authorDid, await resolveHandle(decodeURIComponent(author))),
          (cursor ? gt(recipeTable.id, cursor) : undefined)
        )
        : (cursor ? gt(recipeTable.id, cursor) : undefined)
    )
    .limit(pageSize)
    .orderBy(asc(recipeTable.id));

  return res;
};
