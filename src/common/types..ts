import { z } from 'zod';
import {
  Generated,
  JSONColumnType,
  Selectable,
  Insertable,
  Updateable,
} from 'kysely';

const GenId: z.ZodType<Generated<number>> = z.any();

const GenDate: z.ZodType<Generated<Date>> = z.any();

const NoteSchema = z.record(
  z.string(),
  z
    .object({ bar: z.boolean().optional() })
    .and(z.record(z.number(), z.string()))
);

type Note = z.infer<typeof NoteSchema>;

const JsonNotes: z.ZodType<JSONColumnType<Note>> = z.any();

export const TabTableSchema = z.object({
  id: GenId,
  created_at: GenDate,
  notes: JsonNotes,
  title: z.string(),
  artist: z.string(),
  username: z.string(),
  is_private: z.boolean(),
  note_count: z.number(),
  gtr_string_count: z.number(),
});

export const TabEditableSchema = TabTableSchema.pick({
  note_count: true,
  gtr_string_count: true,
}).extend({ notes: NoteSchema });

export type TabTable = z.infer<typeof TabTableSchema>;
export type TabEditable = z.infer<typeof TabEditableSchema>;
export type TabSelectable = Selectable<TabTable>;
export type TabInsertable = Insertable<TabTable>;
export type TabUpdateable = Updateable<TabTable>;

export const TabSelectableSchema: z.ZodType<TabSelectable> = z.any();
export const TabInsertableSchema: z.ZodType<TabInsertable> = z.any();
export const TabUpdateableSchema: z.ZodType<TabUpdateable> = z.any();

export const TabRespSchema = z.object({
  tab: TabSelectableSchema,
  editAccess: z.boolean(),
});

export type TabResp = z.infer<typeof TabRespSchema>;

export const TabArrayRespSchema = z.object({
  nextPage: z.number(),
  hasNextPage: z.boolean(),
  tabs: TabSelectableSchema.array(),
});

export type TabArrayResp = z.infer<typeof TabArrayRespSchema>;
/*
export const SaveTabRespSchema = z.object({
  code: z.literal(200).or(z.literal(500)),
});

export type SaveTabResp = z.infer<typeof SaveTabRespSchema>; */
