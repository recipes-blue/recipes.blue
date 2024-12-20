import type { Handler } from "hono";
import { createRouter } from '../src/router';
import { createRequestHandler, defaultStreamHandler } from '@tanstack/start/server';

export const tsrEntry: Handler = async (ctx) => {
  const handler = createRequestHandler({
    request: ctx.req.raw,
    createRouter: () => {
      const router = createRouter();
      return router;
    },
  });

  const response = await handler(defaultStreamHandler);

  ctx.res = response;
  return;
};
