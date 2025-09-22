import { Hono } from 'hono';
import { getTodos } from './db/queries';

const app = new Hono();

const router = app.get('/api/todos', async (c) => {
  try {
    const todos = await getTodos();
    return c.json(todos);
  } catch (error) {
    console.log('Failed to fetch todos', error);
    return c.json({ error: 'Failed to fetch todos' }, 500);
  }
});

export type AppType = typeof router;
export default app;
