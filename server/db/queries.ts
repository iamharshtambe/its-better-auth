import { desc } from 'drizzle-orm';
import { db } from './db';
import { todosTable } from './schema';

export async function getTodos() {
  return await db.select().from(todosTable).orderBy(desc(todosTable.createdAt));
}
