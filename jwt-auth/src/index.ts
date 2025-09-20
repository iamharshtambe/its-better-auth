import { Hono } from 'hono';
import { dbConnection } from './db/db';

const app = new Hono();

app.get('/', (c) => {
  dbConnection();
  return c.text('Hello Hono!');
});

export default app;
