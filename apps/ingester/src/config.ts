import { z } from "zod";

const envSchema = z.object({
  TURSO_CONNECTION_URL: z.string().default('https://turso.dev.hayden.moe'),
  TURSO_AUTH_TOKEN: z.string().or(z.undefined()),

  JETSTREAM_ENDPOINT: z
    .string()
    .url()
    .default('wss://jetstream1.us-east.bsky.network/subscribe'),
  PLC_DIRECTORY_URL: z.string().url().default('https://plc.directory'),

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
