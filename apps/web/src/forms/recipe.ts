import { RecipeRecord } from "@cookware/lexicons";
import { z } from "zod";

export const recipeSchema = RecipeRecord.extend({
  time: z.coerce.number(),
  image: z
    .instanceof(FileList)
    .or(z.null()),
});
