import { seed } from 'drizzle-seed';
import { db } from '../server/db';
import * as schema from '../server/db/schema';

async function seedDb() {
  await seed(db, schema).refine((funcs) => ({
    todosTable: {
      columns: {
        title: funcs.valuesFromArray({
          values: ['Play games', 'Read a book', 'Do exercise'],
        }),
        description: funcs.valuesFromArray({
          values: ['At 10 AM', 'Daily', undefined],
        }),
      },
    },
  }));
}

seedDb()
  .then(() => {
    console.log('Seeded database successfully');
    process.exit(0);
  })
  .catch((err) => {
    console.error(`Failed to seed database:\n${err}`);
    process.exit(1);
  });
