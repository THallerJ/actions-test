'use server';
import { TabSchema } from '@/common/types.type';
import { z } from 'zod';
import { saveTabDb } from '@/db';

const tabFormSchema = z.object({
  user: z.string(),
  title: z.string(),
  artist: z.string(),
  isPrivate: z.coerce.boolean(),
  tab: z.preprocess(val => JSON.parse(String(val)), TabSchema),
});

export const saveTab = async (formData: FormData) => {
  const form = Object.fromEntries(formData.entries());
  const result = tabFormSchema.safeParse(form);

  if (result.success) {
    const tab = result.data.tab;
    tab.title = result.data.title;
    tab.user = result.data.user;
    tab.artist = result.data.artist;
    tab.isPrivate = result.data.isPrivate;
    await saveTabDb(tab);
  } else {
    console.log(result.error);
  }
};
