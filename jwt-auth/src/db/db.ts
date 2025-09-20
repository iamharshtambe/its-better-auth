import { Database } from 'bun:sqlite';
import { join } from 'path';

const dbPth = join(process.cwd(), 'db.sqlite');

let db: Database | undefined;

export function applySchema(dbInstance: Database) {
  dbInstance.run(`
      CREATE TABLE IF NOT EXISTS users (
       id TEXT PRIMARY KEY,
       email TEXT UNIQUE NOT NULL,
       password_hash TEXT NOT NULL,
       work TEXT
     ); 
  `);
}

export function dbConnection(): Database {
  if (!db) {
    db = new Database(dbPth);
    db.run('PRAGMA journal_mode = WAL;');
    applySchema(db);
  }

  return db;
}
