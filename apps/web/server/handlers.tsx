import type { Handler } from "hono";
import { createRouter } from '../src/router';
import { renderToString } from 'react-dom/server';
import { StartServer } from '@tanstack/start/server';
//import { createMemoryHistory } from "@tanstack/react-router";

export const tsrEntry: Handler = async (ctx) => {
  const router = createRouter();

  //const memoryHistory = createMemoryHistory({
  //  initialEntries: [ctx.req.path],
  //});

  //router.update({
  //  context: { auth: undefined! },
  //  history: memoryHistory,
  //});

  await router.load();

  let html = renderToString(<StartServer router={router} />)

  ctx.status(router.hasNotFoundMatch() ? 404 : 200);
  return ctx.html(html);
};
