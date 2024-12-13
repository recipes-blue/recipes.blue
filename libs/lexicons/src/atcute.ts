/* eslint-disable */
// This file is automatically generated, do not edit!

/**
 * @module
 * Contains type declarations for Cookware lexicons
 */

import "@atcute/client/lexicons";

declare module "@atcute/client/lexicons" {
  namespace BlueRecipesFeedDefs {
    interface ElapsedTime {
      [Brand.Type]?: "blue.recipes.feed.defs#elapsedTime";
      /** The amount of (#unit) to display. */
      amount: number;
      /** The unit to display the time in. */
      unit: string;
    }
    interface Ingredient {
      [Brand.Type]?: "blue.recipes.feed.defs#ingredient";
      /** How much of the ingredient is needed. */
      amount?: number;
      /**
       * The name of the ingredient. \
       * Maximum string length: 3000 \
       * Maximum grapheme length: 300
       */
      name?: string;
      /**
       * The unit the ingredient is measured in. \
       * Maximum string length: 3000 \
       * Maximum grapheme length: 300
       */
      unit?: string;
    }
    interface Step {
      [Brand.Type]?: "blue.recipes.feed.defs#step";
      /**
       * The instruction to provide to the user. \
       * Maximum string length: 5000 \
       * Maximum grapheme length: 300
       */
      text: string;
    }
  }

  /** Gets a recipe from the index by author DID and rkey. */
  namespace BlueRecipesFeedGetRecipe {
    interface Params {
      did: string;
      rkey: string;
    }
    type Input = undefined;
    interface Output {
      recipe: Result;
    }
    interface AuthorInfo {
      [Brand.Type]?: "blue.recipes.feed.getRecipe#authorInfo";
      handle: string;
    }
    interface Result {
      [Brand.Type]?: "blue.recipes.feed.getRecipe#result";
      author: AuthorInfo;
      ingredients: BlueRecipesFeedDefs.Ingredient[];
      steps: BlueRecipesFeedDefs.Step[];
      title: string;
      description?: string;
    }
  }

  /** Gets recipes from the index. */
  namespace BlueRecipesFeedGetRecipes {
    interface Params {
      cursor: string;
      did?: string;
    }
    type Input = undefined;
    interface Output {
      recipes: Result[];
    }
    interface Result {
      [Brand.Type]?: "blue.recipes.feed.getRecipes#result";
      author: string;
      did: string;
      ingredients: number;
      rkey: string;
      steps: number;
      title: string;
      description?: string;
      type?: string;
    }
  }

  namespace BlueRecipesFeedRecipe {
    /** Record containing a Cookware recipe. */
    interface Record {
      $type: "blue.recipes.feed.recipe";
      ingredients: BlueRecipesFeedDefs.Ingredient[];
      steps: BlueRecipesFeedDefs.Step[];
      /**
       * The title of the recipe. \
       * Maximum string length: 3000 \
       * Maximum grapheme length: 300
       */
      title: string;
      /**
       * The description of the recipe. \
       * Maximum string length: 3000 \
       * Maximum grapheme length: 300
       */
      description?: string;
      estimate?: BlueRecipesFeedDefs.ElapsedTime;
    }
  }

  interface Records {
    "blue.recipes.feed.recipe": BlueRecipesFeedRecipe.Record;
  }

  interface Queries {
    "blue.recipes.feed.getRecipe": {
      params: BlueRecipesFeedGetRecipe.Params;
      output: BlueRecipesFeedGetRecipe.Output;
    };
    "blue.recipes.feed.getRecipes": {
      params: BlueRecipesFeedGetRecipes.Params;
      output: BlueRecipesFeedGetRecipes.Output;
    };
  }

  interface Procedures {}
}
