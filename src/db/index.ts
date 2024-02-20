import clientPromise from '@/db/config';
import { Tab } from '@/common/types.type';
import { ObjectId } from 'mongodb';
import { TabSchema } from '@/common/types.type';

export const getTabsArrayDb = async () => {
  try {
    const client = await clientPromise;
    const collection = client.db('guitar_tab_db').collection<Tab>('tabs');
    const data = await collection.find().toArray();
    return data;
  } catch (e: unknown) {
    console.log(e);
  }
};

export const getTabDb = async (id: string): Promise<Tab | null> => {
  try {
    if (ObjectId.isValid(id)) {
      const client = await clientPromise;
      const collection = client.db('guitar_tab_db').collection<Tab>('tabs');

      const data = collection.aggregate([
        { $match: { _id: new ObjectId(id), isPrivate: false } },
        {
          $addFields: {
            _id: {
              $toString: '$_id',
            },
          },
        },
      ]);

      const document = await data.next();
      return TabSchema.parse(document);
    }
  } catch (e: unknown) {
    console.log(e);
  }
  return null;
};

export const saveTabDb = async (tab: Tab) => {
  try {
    const client = await clientPromise;
    const collection = client.db('guitar_tab_db').collection<Tab>('tabs');
    await collection.insertOne(tab);
  } catch (e: unknown) {
    console.log(e);
  }
};
