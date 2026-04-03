import { eq } from "drizzle-orm";
import { db } from "../lib/database.js";
import {
  GenreInsertType,
  GenreTable,
  GenreUpdateType,
} from "../schema/genres.schema.js";

export async function getGenreDetails({ id }: { id: string | number }) {
  const genre = await db
    .select()
    .from(GenreTable)
    .where(eq(GenreTable.id, Number(id)));

  return genre[0];
}

export async function getAllGenres() {
  const genres = await db.select().from(GenreTable);

  return genres;
}

export async function updateGenre({
  id,
  data,
}: {
  id: string | number;
  data: GenreUpdateType;
}) {
  const genre = await db
    .update(GenreTable)
    .set(data)
    .where(eq(GenreTable.id, Number(id)))
    .returning();

  return genre[0];
}

export async function createGenre({ data }: { data: GenreInsertType }) {
  const genre = await db.insert(GenreTable).values(data).returning();

  return genre[0];
}

export async function bulkInsertGenres({ data }: { data: GenreInsertType[] }) {
  const genres = await db.insert(GenreTable).values(data).returning();

  return genres;
}

export async function deleteGenre({ id }: { id: string | number }) {
  const genre = await db
    .update(GenreTable)
    .set({ isActive: false })
    .where(eq(GenreTable.id, Number(id)))
    .returning();

  return genre[0];
}
