import { getCollection } from '@/db/config';
import { Tab } from '@/common/types.';
import { ObjectId } from 'mongodb';
import { TabSchema, TabsArraySchema } from '@/common/types.';

const getAggPipeline = (
  pageSize: number,
  eqFn: unknown[],
  lastId?: string | null,
  searchQuery?: string | null
) => {
  return [
    {
      $match: {
        $expr: {
          $cond: {
            if: {
              $and: [{ $ne: [lastId, null] }, { $ne: [lastId, undefined] }],
            },
            then: {
              $and: [
                {
                  $lt: [
                    { $toDate: '$_id' },
                    { $toDate: new ObjectId(lastId as string) },
                  ],
                },
                { $eq: eqFn },
              ],
            },
            else: { $eq: eqFn },
          },
        },
      },
    },
    {
      $match: {
        $expr: {
          $cond: {
            if: {
              $and: [
                { $ne: [searchQuery, null] },
                { $ne: [searchQuery, undefined] },
              ],
            },
            then: { $regexMatch: { input: '$title', regex: searchQuery } },
            else: {},
          },
        },
      },
    },
    { $sort: { _id: -1 } },
    { $limit: pageSize },
    {
      $addFields: {
        _id: {
          $toString: '$_id',
        },
      },
    },
  ];
};

export const getTabsPageDb = async (
  lastId?: string | null,
  searchQuery?: string
) => {
  const pageSize = 15;

  try {
    const collection = await getCollection();

    const docs = await collection
      .aggregate(
        getAggPipeline(pageSize, [{ $toBool: '$private' }, false], lastId)
      )
      .toArray();

    return TabsArraySchema.parse(docs);
  } catch (e: unknown) {
    console.log(e);
  }

  return null;
};

export const getUserTabsPageDb = async (
  user: string | null,
  lastId: string | null
) => {
  const pageSize = 15;

  try {
    const collection = await getCollection();

    const docs = await collection
      .aggregate(getAggPipeline(pageSize, ['$user', user], lastId))
      .toArray();

    return TabsArraySchema.parse(docs);
  } catch (e: unknown) {
    console.log(e);
  }

  return null;
};

// todo: fox private to make it behave like in getTabsPageDb. Only work if not private or user matches user in tab. otherwise return null
export const getTabDb = async (id: string): Promise<Tab | null> => {
  try {
    if (ObjectId.isValid(id)) {
      const collection = await getCollection();

      const agg = collection.aggregate([
        { $match: { _id: new ObjectId(id) } },
        {
          $addFields: {
            _id: {
              $toString: '$_id',
            },
          },
        },
      ]);

      const doc = await agg.next();
      return TabSchema.parse(doc);
    }
  } catch (e: unknown) {
    console.log(e);
  }
  return null;
};

export const saveTabDb = async (tab: Tab) => {
  try {
    const collection = await getCollection();
    await collection.insertOne(tab);
  } catch (e: unknown) {
    console.log(e);
  }
};
