/* eslint-disable */
// This file is automatically generated, do not edit!

/**
 * @module
 * Contains type declarations for Cookware lexicons
 */

import "@atcute/client/lexicons";

declare module "@atcute/client/lexicons" {
  namespace MoeHaydenCookwareDefs {
    interface Ingredient {
      [Brand.Type]?: "moe.hayden.cookware.defs#ingredient";
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
      [Brand.Type]?: "moe.hayden.cookware.defs#step";
      /**
       * The instruction to provide to the user. \
       * Maximum string length: 5000 \
       * Maximum grapheme length: 300
       */
      text: string;
    }
  }

  namespace MoeHaydenCookwareRecipe {
    /** Record containing a Cookware recipe. */
    interface Record {
      $type: "moe.hayden.cookware.recipe";
      ingredients: MoeHaydenCookwareDefs.Ingredient[];
      steps: MoeHaydenCookwareDefs.Step[];
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
    }
  }

  interface Records {
    "moe.hayden.cookware.recipe": MoeHaydenCookwareRecipe.Record;
  }

  interface Queries {}

  interface Procedures {}
}
