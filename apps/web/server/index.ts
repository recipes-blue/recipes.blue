import { Hono } from 'hono';
import { tsrEntry } from './handlers';

const app = new Hono();

app.get('/', tsrEntry);
app.get('/recipes/new', tsrEntry);
app.get('/recipes/:author', tsrEntry);
app.get('/recipes/:author/:rkey', tsrEntry);
app.get('/login', tsrEntry);

export default app;
