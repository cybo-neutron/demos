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
import { MovieTable } from "./movie.schema.js";
import { GenreTable } from "./genres.schema.js";

export const MovieGenreTable = pgTable("movie_genre", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  movieId: bigserial("movie_id", { mode: "number" }).references(
    () => MovieTable.id,
  ),
  genreId: bigserial("genre_id", { mode: "number" }).references(
    () => GenreTable.id,
  ),

  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

const MovieGenreSelectSchema = createSelectSchema(MovieGenreTable);
const MovieGenreInsertSchema = createInsertSchema(MovieGenreTable);
const MovieGenreUpdateSchema = createUpdateSchema(MovieGenreTable);

export type MovieGenreSelectType = z.infer<typeof MovieGenreSelectSchema>;
export type MovieGenreInsertType = z.infer<typeof MovieGenreInsertSchema>;
export type MovieGenreUpdateType = z.infer<typeof MovieGenreUpdateSchema>;
