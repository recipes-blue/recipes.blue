import { pino } from "pino";

export const rootLogger = pino({ name: 'recipes' });
export const apiLogger = pino({ name: 'recipes.api' });
export const authLogger = pino({ name: 'recipes.auth' });
