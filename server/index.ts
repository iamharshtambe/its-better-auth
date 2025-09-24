import { Hono } from 'hono';
import { auth } from './lib/auth';
import { todos } from './routes/todos.route';

const app = new Hono();

const router = app
  .on(['POST', 'GET'], '/api/auth/*', (c) => auth.handler(c.req.raw))
  .route('/api/todos', todos);

export type AppType = typeof router;
export default app;
