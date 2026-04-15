import {
  bigserial,
  text,
  jsonb,
  pgEnum,
  pgTable,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import z from "zod";

export const GenreTable = pgTable("genre", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  name: text("name").notNull(),
  tmdbGenreId: text("tmdb_genre_id"),

  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

const GenreSelectSchema = createSelectSchema(GenreTable);
const GenreInsertSchema = createInsertSchema(GenreTable);
const GenreUpdateSchema = createUpdateSchema(GenreTable);

export type GenreSelectType = z.infer<typeof GenreSelectSchema>;
export type GenreInsertType = z.infer<typeof GenreInsertSchema>;
export type GenreUpdateType = z.infer<typeof GenreUpdateSchema>;
