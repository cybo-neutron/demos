import { bigserial, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import z from "zod";

export const User = pgTable("user", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

const UserSelectSchema = createSelectSchema(User);
const UserInsertSchema = createInsertSchema(User);
const UserUpdateSchema = createUpdateSchema(User);

export type UserSelectType = z.infer<typeof UserSelectSchema>;
export type UserInsertType = z.infer<typeof UserInsertSchema>;
export type UserUpdateType = z.infer<typeof UserUpdateSchema>;
