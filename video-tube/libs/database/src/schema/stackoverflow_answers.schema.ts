import { bigserial, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import z from "zod";

export const StackOverflowAnswerTable = pgTable("stackoverflow_answers", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  stackOverflowId: bigserial("stack_overflow_id", { mode: "number" }).notNull(),
  stackOverflowUserId: bigserial("stack_overflow_user_id", {
    mode: "number",
  }).notNull(),
  parentId: bigserial("parent_id", { mode: "number" }).notNull(),

  body: text("body"),

  closedDate: timestamp("closed_date"),
  creationDate: timestamp("creation_date"),
});

const StackOverflowAnswerSelectSchema = createSelectSchema(
  StackOverflowAnswerTable,
);
const StackOverflowAnswerInsertSchema = createInsertSchema(
  StackOverflowAnswerTable,
);
const StackOverflowAnswerUpdateSchema = createUpdateSchema(
  StackOverflowAnswerTable,
);

export type StackOverflowAnswerSelectType = z.infer<
  typeof StackOverflowAnswerSelectSchema
>;
export type StackOverflowAnswerInsertType = z.infer<
  typeof StackOverflowAnswerInsertSchema
>;
export type StackOverflowAnswerUpdateType = z.infer<
  typeof StackOverflowAnswerUpdateSchema
>;
