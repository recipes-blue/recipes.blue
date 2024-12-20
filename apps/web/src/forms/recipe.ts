import { RecipeRecord } from "@cookware/lexicons";
import { z } from "zod";

export const recipeSchema = RecipeRecord.extend({
  time: z.coerce.number(),
  image: typeof window === 'undefined' ? z.any() : z
    .instanceof(FileList)
    .or(z.null()),
});
