import { desc, eq } from 'drizzle-orm';
import { db } from './db';
import { todosTable } from './schema';

export async function getTodosByUserId(userId: string) {
  return await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.user_id, userId))
    .orderBy(desc(todosTable.createdAt));
}
