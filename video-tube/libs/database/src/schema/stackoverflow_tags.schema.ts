import { bigserial, pgTable, text } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import z from "zod";

export const StackOverflowTagTable = pgTable("stackoverflow_tags", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  stackOverflowId: bigserial("stack_overflow_id", { mode: "number" }).notNull(),
  tag: text("tag").notNull(),
});

const StackOverflowTagSelectSchema = createSelectSchema(StackOverflowTagTable);
const StackOverflowTagInsertSchema = createInsertSchema(StackOverflowTagTable);
const StackOverflowTagUpdateSchema = createUpdateSchema(StackOverflowTagTable);

export type StackOverflowTagSelectType = z.infer<
  typeof StackOverflowTagSelectSchema
>;
export type StackOverflowTagInsertType = z.infer<
  typeof StackOverflowTagInsertSchema
>;
export type StackOverflowTagUpdateType = z.infer<
  typeof StackOverflowTagUpdateSchema
>;
