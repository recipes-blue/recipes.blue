import { Hono } from 'hono';
import { tsrEntry } from './handlers';

const app = new Hono();

app.get('/*', tsrEntry);

export default app;
