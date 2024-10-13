import { TabInsertable, TabSelectable, TabUpdateable } from '@/common/types.';
import { db } from './config';
import { Expression, SqlBool } from 'kysely';

export const getTabsArrayDb = async (
  page: number,
  user?: string | null,
  userOnly?: boolean,
  searchQuery?: string | null
): Promise<{
  tabs: TabSelectable[];
  hasNextPage: boolean;
  nextPage: number;
}> => {
  const pageSize = 15;
  searchQuery = searchQuery?.toLowerCase();

  let query = db.selectFrom('tabs').selectAll();

  query = query.where(eb => {
    const ors: Expression<SqlBool>[] = [];

    if (user) {
      ors.push(eb('username', '=', user));
    }

    if (!userOnly) {
      ors.push(eb('is_private', '=', false));
    }

    return eb.or(ors);
  });

  if (searchQuery)
    query = query
      .where(({ eb, fn }) =>
        eb(fn('lower', ['title']), 'like', `%${searchQuery}%`).or(
          fn('lower', ['artist']),
          'like',
          `%${searchQuery}%`
        )
      )
      .orderBy(({ eb, fn, or }) =>
        eb
          .case()
          .when(
            or([
              eb(fn('lower', ['title']), '=', searchQuery),
              eb(fn('lower', ['artist']), '=', searchQuery),
            ])
          )
          .then(0)
          .else(1)
          .end()
      );

  // we add 1 to page size so we know if the next page exists
  query = query
    .orderBy('created_at desc')
    .offset(page * pageSize)
    .limit(pageSize + 1);

  const tabs = await query.execute();

  let hasNextPage = false;
  if (tabs.length === pageSize + 1) {
    hasNextPage = true;
    tabs.pop();
  }

  return { tabs, hasNextPage, nextPage: page + 1 };
};

export const getTabDb = async (
  id: string,
  user?: string | null,
  requireMatch?: boolean
) => {
  let query = db.selectFrom('tabs').selectAll().where('id', '=', Number(id));

  if (requireMatch) {
    if (!user) return { tab: null, canEdit: false };
    query = query.where('username', '=', user);
  } else if (user) {
    query = query.where(eb =>
      eb.or([eb('is_private', '=', false), eb('username', '=', user)])
    );
  } else query = query.where('is_private', '=', false);

  const tab = (await query.executeTakeFirst()) || null;

  const editAccess = tab && user ? tab.username === user : false;

  return { tab, editAccess };
};

export const saveTabDb = async (tab: TabInsertable) => {
  const found = await db
    .selectFrom('tabs')
    .where('username', '=', tab.username)
    .where('title', '=', tab.title)
    .where('artist', '=', tab.artist)
    .executeTakeFirst();

  if (!found) await db.insertInto('tabs').values(tab).executeTakeFirstOrThrow();
  else
    db.updateTable('tabs')
      .set(tab)
      .where('username', '=', tab.username)
      .where('title', '=', tab.title)
      .where('artist', '=', tab.artist)
      .executeTakeFirst();
};

export const updateTabDb = async (tab: TabUpdateable, user: string) => {
  if (tab.id)
    db.updateTable('tabs')
      .set(tab)
      .where('id', '=', tab.id)
      .where('username', '=', user)
      .executeTakeFirst();
};

export const deleteTabDb = async (id: string, user: string) => {
  await db
    .deleteFrom('tabs')
    .where('username', '=', user)
    .where('id', '=', Number(id))
    .executeTakeFirst();
};

export const getRecentTabInfo = async (user: string) => {
  return await db
    .selectFrom('tabs')
    .select(['id', 'artist', 'title'])
    .where('username', '=', user)
    .orderBy('created_at desc')
    .executeTakeFirst();
};
