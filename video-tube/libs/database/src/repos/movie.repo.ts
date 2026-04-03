/*
getMovieDetails()
getAllMovies() -> pagination, search, filter
updateMovie()
createMovie()
deleteMovie()
*/

import { eq } from "drizzle-orm";
import { db } from "../lib/database.js";
import {
  MovieInsertType,
  MovieTable,
  MovieUpdateType,
} from "../schema/movie.schema.js";

export async function getMovieDetails({ id }: { id: string }) {
  const movie = db
    .select()
    .from(MovieTable)
    .where(eq(MovieTable.id, Number(id)));

  return movie;
}

export async function getAllMovies() {
  const movies = db.select().from(MovieTable);

  return movies;
}

export async function updateMovie({
  id,
  data,
}: {
  id: string;
  data: MovieUpdateType;
}) {
  const movie = db
    .update(MovieTable)
    .set(data)
    .where(eq(MovieTable.id, Number(id)))
    .returning();

  return movie;
}

export async function createMovie({ data }: { data: MovieInsertType }) {
  const movie = db.insert(MovieTable).values(data);

  return movie;
}

export async function bulkInsertMovies({ data }: { data: MovieInsertType[] }) {
  const movie = db.insert(MovieTable).values(data);

  return movie;
}

export async function deleteMovie({ id }: { id: string }) {
  //   const movie = db.delete(MovieTable).where(eq(MovieTable.id, Number(id)));
  const movie = db
    .update(MovieTable)
    .set({ isActive: false })
    .where(eq(MovieTable.id, Number(id)))
    .returning();

  return movie;
}
