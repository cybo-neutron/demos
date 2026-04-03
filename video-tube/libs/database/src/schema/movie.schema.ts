/*
- id
- title
- description
- genres -> []
- poster
- source -> tmdb
*/

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

export const sourceEnum = pgEnum("source", ["tmdb", "hianime"]);

export const MovieTable = pgTable("movie", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  title: text("title"),
  description: text("description"),
  genres: jsonb("genres"),
  posterPath: text("poster_path"),
  tmdbId: text("tmdb_id"),
  source: sourceEnum("source").notNull(),
  productionCountries : jsonb('production_countries'),
  productionCompanies: jsonb("production_companies"),
  releaseDate: text("release_date"),
  tagline: text("tagline"),

  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

const MovieSelectSchema = createSelectSchema(MovieTable);
const MovieInsertSchema = createInsertSchema(MovieTable);
const MovieUpdateSchema = createUpdateSchema(MovieTable);

export type MovieSelectType = z.infer<typeof MovieSelectSchema>;
export type MovieInsertType = z.infer<typeof MovieInsertSchema>;
export type MovieUpdateType = z.infer<typeof MovieUpdateSchema>;
