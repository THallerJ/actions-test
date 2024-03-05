import { TabInsertable, TabSelectable } from '@/common/types.';
import { db } from './config';
import { sql } from 'kysely';
import { getSession } from '@auth0/nextjs-auth0';

export const getTabsArrayDb = async (
  page: number,
  user?: string | null,
  searchQuery?: string | null
): Promise<{
  tabs: TabSelectable[];
  hasNextPage: boolean;
  nextPage: number;
}> => {
  const pageSize = 15;

  try {
    let query = db.selectFrom('tab').selectAll();

    if (user) query = query.where('user', '=', user);
    else query = query.where('private', '=', false);

    if (searchQuery)
      query = query.where(({ eb }) =>
        eb('title', 'like', `%${searchQuery}%`).or(
          'artist',
          'like',
          `%${searchQuery}%`
        )
      );

    if (searchQuery)
      query = query.orderBy([
        sql`case when title=${searchQuery} then 0 else 1 end`,
        sql`case when artist=${searchQuery} then 0 else 1 end`,
        'created_at desc',
      ]);
    else query = query.orderBy('created_at desc');

    // we add 1 to page size so we know if the next page exists
    query = query.offset(page * pageSize).limit(pageSize + 1);

    const tabs = await query.execute();

    let hasNextPage = false;
    if (tabs.length === pageSize + 1) {
      hasNextPage = true;
      tabs.pop();
    }

    return { tabs, hasNextPage, nextPage: page + 1 };
  } catch (e: unknown) {
    console.log(e);
  }

  return { tabs: [], hasNextPage: false, nextPage: 0 };
};

export const getTabDb = async (id: string) => {
  try {
    const result = await db
      .selectFrom('tab')
      .selectAll()
      .where('id', '=', Number(id))
      .executeTakeFirstOrThrow();

    const session = await getSession();
    const user = session?.user;

    if (user?.nickname !== result.user && result.private === true) return null;

    return result;
  } catch (e: unknown) {
    console.log(e);
  }
  return null;
};

export const saveTabDb = async (tab: TabInsertable) => {
  try {
    await db.insertInto('tab').values(tab).executeTakeFirstOrThrow();
  } catch (e: unknown) {
    console.log(e);
  }
};
