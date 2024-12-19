import { pino } from "pino";

export const rootLogger = pino({ name: 'recipes' });
export const ingestLogger = pino({ name: 'recipes.ingest' });
