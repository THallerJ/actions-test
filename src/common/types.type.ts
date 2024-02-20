import { z } from 'zod';

export const TabSchema = z.object({
  _id: z.string().optional(),
  title: z.string().optional(),
  artist: z.string().optional(),
  isPrivate: z.boolean().optional(),
  user: z.string().optional(),
  count: z.number(),
  gtr_string_count: z.number(),
  notes: z.record(z.string(), z.record(z.string(), z.string())),
});

export type Tab = z.infer<typeof TabSchema>;

export const TabsApiSchema = z.object({
  data: z.array(TabSchema) || z.object({}),
});
