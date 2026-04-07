/*
getMovieDetails()
getAllMovies() -> pagination, search, filter
updateMovie()
createMovie()
deleteMovie()
*/

import { and, asc, count, desc, eq, gt, gte, lt, lte, or } from "drizzle-orm";
import { db } from "../lib/database.js";
import {
  MovieInsertType,
  MovieSelectType,
  MovieTable,
  MovieUpdateType,
} from "../schema/movie.schema.js";
import { CursorType, isValidCursor } from "../utils/cursor_validity.js";

export async function getMovieDetails({ id }: { id: string }) {
  const movie = db
    .select()
    .from(MovieTable)
    .where(eq(MovieTable.id, Number(id)));

  return movie;
}

export async function getAllMovies({
  page,
  pageSize,
  search,
  sortBy = [
    ["releaseDate", "desc"],
    ["id", "desc"],
  ],
}: {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: [keyof MovieSelectType, "asc" | "desc"][];
}) {
  const sortArr =
    sortBy?.map(([key, order]) => {
      const column = (MovieTable as any)[key];
      return order === "desc" ? desc(column) : asc(column);
    }) ?? [];

  const result = await db.transaction(async (tx) => {
    let movies: MovieSelectType[] = [];

    movies = await tx
      .select()
      .from(MovieTable)
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .orderBy(...sortArr);

    const totalCountResult = await tx
      .select({ count: count() })
      .from(MovieTable);

    return {
      movies,
      total: totalCountResult[0].count,
    };
  });

  return result;
}

export async function getAllMoviesCursorPagination({
  page,
  pageSize,
  search,
  sortBy = [
    ["releaseDate", "desc"],
    ["id", "desc"],
  ],
  cursor,
}: {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: [keyof MovieSelectType, "asc" | "desc"][];
  cursor: Partial<Record<keyof MovieSelectType, CursorType>> | null;
}) {
  const sortArr =
    sortBy?.map(([key, order]) => {
      const column = (MovieTable as any)[key];
      return order === "desc" ? desc(column) : asc(column);
    }) ?? [];

  const result = await db.transaction(async (tx) => {
    let movies: MovieSelectType[] = [];
    let whereArr = [];

    if (cursor) {
      const cursorValid = isValidCursor(sortBy, cursor);

      if (!cursorValid) {
        throw new Error("Invalid cursor");
      }

      whereArr.push(
        or(
          and(
            eq(MovieTable.releaseDate, cursor["releaseDate"].value),
            lt(MovieTable.id, Number(cursor["id"].value)),
          ),
          lt(MovieTable.releaseDate, cursor["releaseDate"].value),
        ),
      );
    }

    movies = await tx
      .select()
      .from(MovieTable)
      .where(and(...whereArr))
      .limit(pageSize)
      .orderBy(...sortArr);

    const totalCountResult = await tx
      .select({ count: count() })
      .from(MovieTable);

    let newCursor: Partial<Record<keyof MovieSelectType, CursorType>> | null =
      null;

    if (movies.length > 0) {
      newCursor = {
        releaseDate: {
          op: "lt",
          value: movies[movies.length - 1].releaseDate!,
        },
        id: {
          op: "lt",
          value: movies[movies.length - 1].id.toString(),
        },
      };
    }

    return {
      movies,
      total: totalCountResult[0].count,
      cursor: newCursor,
    };
  });

  return result;
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
