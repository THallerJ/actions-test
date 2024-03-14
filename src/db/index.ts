import { TabInsertable, TabSelectable, TabUpdateable } from '@/common/types.';
import { db } from './config';

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
  searchQuery = searchQuery?.toLowerCase();

  try {
    let query = db.selectFrom('tab').selectAll();

    if (user) query = query.where('user', '=', user);
    else query = query.where('private', '=', false);

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
  } catch (e: unknown) {
    console.log(e);
  }

  return { tabs: [], hasNextPage: false, nextPage: 0 };
};

export const getTabDb = async (
  id: string,
  user?: string | null,
  requireMatch?: boolean
) => {
  try {
    let query = db.selectFrom('tab').selectAll().where('id', '=', Number(id));

    if (requireMatch) {
      if (!user) return { tab: null, canEdit: false };
      query = query.where('user', '=', user);
    } else if (user) {
      query = query.where(eb =>
        eb.or([eb('private', '=', false), eb('user', '=', user)])
      );
    } else query = query.where('private', '=', false);

    const tab = (await query.executeTakeFirst()) || null;

    const editAccess = tab && user ? tab.user === user : false;

    return { tab, editAccess };
  } catch (e: unknown) {
    console.log(e);
  }

  return { tab: null, canEdit: false };
};

export const saveTabDb = async (tab: TabInsertable) => {
  try {
    await db.insertInto('tab').values(tab).executeTakeFirstOrThrow();
  } catch (e: unknown) {
    console.log(e);
  }
};

export const updateTabDb = async (tab: TabUpdateable, user: string) => {
  if (tab.id)
    db.updateTable('tab')
      .set(tab)
      .where('id', '=', tab.id)
      .where('user', '=', user)
      .executeTakeFirst();
};

export const deleteTabDb = async (id: string, user: string) => {
  try {
    await db
      .deleteFrom('tab')
      .where('user', '=', user)
      .where('id', '=', Number(id))
      .executeTakeFirst();
  } catch (e: unknown) {
    console.log(e);
  }
};
