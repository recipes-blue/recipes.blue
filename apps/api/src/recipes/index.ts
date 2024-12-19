import { Hono } from "hono";

export const recipeApp = new Hono();

recipeApp.post('/', async ctx => {});
