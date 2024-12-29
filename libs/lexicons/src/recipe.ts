import { z } from 'zod';
import { IngredientObject, StepObject } from './defs.js';

export const RecipeCollection = 'blue.recipes.feed.recipe' as const;

export const RecipeRecord = z.object({
  title: z.string().max(3000, 'Recipe titles must be under 3000 characters.'),
  description: z.string().max(3000, 'Recipe descriptions must be under 3000 characters.').nullable(),
  time: z.number({ message: 'Time must be a number.' }),
  serves: z.number({ message: 'Serves must be a number.' }),
  ingredients: z.array(IngredientObject),
  steps: z.array(StepObject),
});

export type Recipe = z.infer<typeof RecipeRecord>;
