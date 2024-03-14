import { getDb } from '@/db/config';
import { sql } from 'kysely';

export const createTables = async () => {
  const db = getDb({
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
  });

  await db.schema
    .createTable('tab')
    .ifNotExists()
    .addColumn('id', 'serial', cb => cb.primaryKey())
    .addColumn('title', 'varchar', cb => cb.notNull())
    .addColumn('artist', 'varchar', cb => cb.notNull())
    .addColumn('user', 'varchar', cb => cb.notNull())
    .addColumn('private', 'boolean', cb => cb.defaultTo(false))
    .addColumn('notes', 'json')
    .addColumn('count', 'integer', cb => cb.notNull())
    .addColumn('gtr_string_count', 'integer', cb => cb.notNull())
    .addColumn('created_at', 'timestamp', cb =>
      cb.notNull().defaultTo(sql`now()`)
    )
    .execute();
};

createTables();
