import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().lte(65535).default(8080),
  HOST: z.string().ip().default('0.0.0.0'),

  PUBLIC_DIR: z.string().default('../web/dist'),

  CORS_ORIGINS: z
    .string()
    .transform((arg) => arg.split(','))
    .default('http://127.0.0.1:5173,https://cookware.dev.hayden.moe'),

  PLC_DIRECTORY_URL: z.string().url().default('https://plc.directory'),

  JWKS_PRIVATE_KEY: z.string().default('{"kty":"EC","x":"pew2xWIyBQ4XSY4gcCuTJBI-oC5rQqQlcDxIN8nN834","y":"aiJFNEFWyKKWGiFKPRvLAU4wdhsfgysfTfTuzTC4LNQ","crv":"P-256","d":"QS-q9RzH1u2Oj8gDiUzLk1qpGxZjKSf-3Z1oKCRL_jQ"}'),

  SESSION_KEY: z.string().default('bJVS+Dx03A3QWWfW3A5Om5DGx1GKptx+1IGAXzOTpw8='),
  SESSION_TTL: z.number().default(((60 * 60) * 24) * 5), // expire in 5 days

  SENTRY_DSN: z.string().or(z.undefined()),

  ENV: z
    .union([
      z.literal('development'),
      z.literal('production'),
    ])
    .default('development'),
});

const env = envSchema.parse(process.env);

export default env;
export type Env = z.infer<typeof envSchema>;
