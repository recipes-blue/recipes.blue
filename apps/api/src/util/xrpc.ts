import { Context } from "hono";
import { StatusCode } from "hono/utils/http-status";

export class XRPCError extends Error {
  constructor(
    message: string,
    public error: string,
    public code: StatusCode,
  ) {
    super(message);
  }

  hono(ctx: Context) {
    ctx.status(this.code);
    return ctx.json({
      error: this.error,
      message: this.message,
    });
  }
}
