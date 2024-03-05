'use server';
import { TabInsertableSchema } from '@/common/types.';
import { saveTabDb } from '@/db';

export const saveTab = async (formData: FormData) => {
  const form = Object.fromEntries(formData.entries());
  const result = TabInsertableSchema.safeParse(form);

  if (result.success) {
    await saveTabDb(result.data);
  } else {
    console.log(result.error);
  }
};
