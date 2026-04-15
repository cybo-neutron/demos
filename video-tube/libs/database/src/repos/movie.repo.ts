/*
getMovieDetails()
getAllMovies() -> pagination, search, filter
updateMovie()
createMovie()
deleteMovie()
*/

import {
  and,
  asc,
  count,
  desc,
  eq,
  gt,
  gte,
  ilike,
  inArray,
  lt,
  lte,
  or,
  SQL,
  sql,
} from "drizzle-orm";
import { db } from "../lib/database.js";
import {
  MovieInsertType,
  MovieSelectType,
  MovieTable,
  MovieUpdateType,
} from "../schema/movie.schema.js";
import { CursorType, isValidCursor } from "../utils/cursor_validity.js";
import { MovieGenreTable } from "../schema/movie_genre.schema.js";

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
  genres,
}: {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: [keyof MovieSelectType, "asc" | "desc"][];
  genres?: {
    genreIds: string[];
    useJoin: boolean;
  };
}) {
  const sortArr =
    sortBy?.map(([key, order]) => {
      const column = (MovieTable as any)[key];
      return order === "desc" ? desc(column) : asc(column);
    }) ?? [];

  const conditions: SQL[] = [];

  const result = await db.transaction(async (tx) => {
    let query: any;

    query = tx.select().from(MovieTable).$dynamic();

    query = query.limit(pageSize);

    query = query.offset((page - 1) * pageSize);

    query = query.orderBy(...sortArr);

    if (genres?.genreIds && genres?.genreIds.length > 0) {
      if (genres.useJoin) {
        query = query.innerJoin(
          MovieGenreTable,
          eq(MovieTable.id, MovieGenreTable.movieId),
        );
      } else {
        conditions.push(sql`
          SELECT 1
          FROM jsonb_array_elements(${MovieTable.genres}) AS elem
          WHERE (elem->>'id')::int = ANY(${genres.genreIds})`);
      }
    }

    if (search) {
      conditions.push(ilike(MovieTable.title, `%${search}%`));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const movies: MovieSelectType[] = await query;

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
  pageSize,
  search,
  sortBy = [
    ["releaseDate", "desc"],
    ["id", "desc"],
  ],
  cursor,
  genres,
}: {
  pageSize: number;
  search?: string;
  sortBy?: [keyof MovieSelectType, "asc" | "desc"][];
  // cursor: Partial<Record<keyof MovieSelectType, CursorType>> | null;
  cursor: { releaseDate: CursorType; id: CursorType } | null;
  genres?: {
    genreIds: string[];
    useJoin: boolean;
  };
}) {
  const sortArr =
    sortBy?.map(([key, order]) => {
      const column = (MovieTable as any)[key];
      return order === "desc" ? desc(column) : asc(column);
    }) ?? [];

  // const joinArr = [];
  // if (genres?.genreIds && genres.useJoin) {
  //   joinArr.push(
  //     innerJoin(MovieGenreTable, eq(MovieTable.id, MovieGenreTable.movieId)),
  //   );
  // }

  const conditions: SQL[] = [];
  if (cursor) {
    // const cursorValid = isValidCursor(sortBy, cursor);

    // if (!cursorValid) {
    //   throw new Error("Invalid cursor");
    // }

    if (cursor.releaseDate && cursor.id) {
      conditions.push(
        or(
          and(
            eq(MovieTable.releaseDate, cursor.releaseDate.value),
            lt(MovieTable.id, Number(cursor.id.value)),
          ),
          lt(MovieTable.releaseDate, cursor.releaseDate.value),
        ) as SQL,
      );
    }
  }

  const result = await db.transaction(async (tx) => {
    let query: any;

    query = tx.select().from(MovieTable).$dynamic();

    query = query.limit(pageSize);

    query = query.orderBy(...sortArr);

    if (genres?.genreIds && genres?.genreIds.length > 0) {
      if (genres.useJoin) {
        query = query.innerJoin(
          MovieGenreTable,
          eq(MovieTable.id, MovieGenreTable.movieId),
        );
        conditions.push(
          eq(MovieGenreTable.genreId, Number(genres.genreIds[0])),
        );
      } else {
        conditions.push(sql`
          SELECT 1
          FROM jsonb_array_elements(${MovieTable.genres}) AS elem
          WHERE (elem->>'id')::int = ANY(${genres.genreIds})`);
      }
    }

    query = query.where(and(...conditions));

    const movies = await query;

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
