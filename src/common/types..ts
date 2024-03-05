import { z } from 'zod';
import {
  Generated,
  JSONColumnType,
  Selectable,
  Insertable,
  Updateable,
} from 'kysely';

const GenId: z.ZodType<Generated<Number>> = z.any();

const GenDate: z.ZodType<Generated<Date>> = z.any();

const JsonNotes: z.ZodType<
  JSONColumnType<Record<string, Record<string, string>>>
> = z.any();

export const TabTableSchema = z.object({
  id: GenId,
  created_at: GenDate,
  notes: JsonNotes,
  title: z.string(),
  artist: z.string(),
  user: z.string(),
  private: z.boolean(),
  count: z.number(),
  gtr_string_count: z.number(),
});

export const TabEditableSchema = TabTableSchema.pick({
  count: true,
  gtr_string_count: true,
}).extend({ notes: z.record(z.string(), z.record(z.string(), z.string())) });

export type TabTable = z.infer<typeof TabTableSchema>;
export type TabEditable = z.infer<typeof TabEditableSchema>;
export type TabSelectable = Selectable<TabTable>;
export type TabInsertable = Insertable<TabTable>;
export type TabUpdateable = Updateable<TabTable>;

export const TabSelectableSchema: z.ZodType<TabSelectable> = z.any();
export const TabInsertableSchema: z.ZodType<TabInsertable> = z.any();
export const TabUpdateableSchema: z.ZodType<TabUpdateable> = z.any();

export const TabRespSchema = z.object({
  nextPage: z.number(),
  hasNextPage: z.boolean(),
  tabs: TabSelectableSchema.array(),
});

export type TabResp = z.infer<typeof TabRespSchema>;
