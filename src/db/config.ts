import { PostgresDialect, Kysely } from 'kysely';
import { Pool } from 'pg';
import { TabTable } from '@/common/types.';

export interface Database {
  tab: TabTable;
}

type GetDbProps = {
  database?: string;
  host?: string;
  user?: string;
  port?: number;
  password?: string;
};

export const getDb = ({ database, host, user, port, password }: GetDbProps) => {
  const dialect = new PostgresDialect({
    pool: new Pool({
      database,
      host,
      user,
      port,
      password,
    }),
  });

  return new Kysely<Database>({
    dialect,
  });
};

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    port: Number(process.env.POSTGRES_PORT),
    password: String(process.env.POSTGRES_PASSWORD),
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
