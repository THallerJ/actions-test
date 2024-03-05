import { PostgresDialect, Kysely } from 'kysely';
import { Pool } from 'pg';
import { TabTable } from '@/common/types.';

export interface Database {
  tab: TabTable;
}

const dialect = new PostgresDialect({
  pool: new Pool({
    database: 'database',
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    port: Number(process.env.POSTGRES_PORT),
    password: process.env.POSTGRES_PASSWORD,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
