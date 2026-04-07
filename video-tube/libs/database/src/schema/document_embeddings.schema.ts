import {
  bigserial,
  boolean,
  pgTable,
  timestamp,
  text,
  vector,
} from "drizzle-orm/pg-core";
import { User } from "./user.schema.js";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import z from "zod";

export const DocumentEmbeddings = pgTable("document_embeddings", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  content: text("content").notNull(),
  embedding: vector("embedding", { dimensions: 1024 }).notNull(),
  uploadedBy: bigserial("uploaded_by", { mode: "number" })
    .references(() => User.id),
  isActive: boolean("is_active").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

const DocumentEmbeddingsSelectSchema = createSelectSchema(DocumentEmbeddings);
const DocumentEmbeddingsInsertSchema = createInsertSchema(DocumentEmbeddings);
const DocumentEmbeddingsUpdateSchema = createUpdateSchema(DocumentEmbeddings);

export type DocumentEmbeddingsSelectType = z.infer<
  typeof DocumentEmbeddingsSelectSchema
>;
export type DocumentEmbeddingsInsertType = z.infer<
  typeof DocumentEmbeddingsInsertSchema
>;
export type DocumentEmbeddingsUpdateType = z.infer<
  typeof DocumentEmbeddingsUpdateSchema
>;
