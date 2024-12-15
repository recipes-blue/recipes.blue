import { resolveHandle } from "@/lib/auth/handle";
import { db, recipeTable } from "@cookware/database";
import { and, eq } from "drizzle-orm";

export const getRecipe = async (actor: string, rkey: string) => {
  const did = await resolveHandle(actor);

  const res = await db.query.recipeTable.findFirst({
    where: and(
      eq(recipeTable.authorDid, did),
      eq(recipeTable.rkey, rkey),
    ),
  });

  return res;
};
