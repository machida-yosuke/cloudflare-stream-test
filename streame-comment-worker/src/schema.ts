import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const comments = sqliteTable('comments', {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  text: text("text"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull()
})

export const insertCommentsSchema = createInsertSchema(comments);
export const selectCommentsSchema = createSelectSchema(comments);