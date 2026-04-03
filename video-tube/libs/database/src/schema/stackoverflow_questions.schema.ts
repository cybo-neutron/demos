import { bigserial, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import z from "zod";

export const StackoverflowQuestionsTable = pgTable("stackoverflow_questions", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  stackOverflowId: bigserial("stack_overflow_id", { mode: "number" }).notNull(),
  stackOverflowUserId: bigserial("stack_overflow_user_id", {
    mode: "number",
  }).notNull(),
  title: text("title"),
  body: text("body"),
  closedDate: timestamp("closed_date"),
  creationDate: timestamp("creation_date"),
});

const StackOverflowQuestionSelectSchema = createSelectSchema(
  StackoverflowQuestionsTable,
);
const StackOverflowQuestionInsertSchema = createInsertSchema(
  StackoverflowQuestionsTable,
);
const StackOverflowQuestionUpdateSchema = createUpdateSchema(
  StackoverflowQuestionsTable,
);

export type StackOverflowQuestionSelectType = z.infer<
  typeof StackOverflowQuestionSelectSchema
>;
export type StackOverflowQuestionInsertType = z.infer<
  typeof StackOverflowQuestionInsertSchema
>;
export type StackOverflowQuestionUpdateType = z.infer<
  typeof StackOverflowQuestionUpdateSchema
>;
