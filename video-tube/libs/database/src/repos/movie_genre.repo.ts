import { db } from "../lib/database.js";
import { MovieGenreTable } from "../schema/movie_genre.schema.js";

async function bulkInsertMovieGenre({ data }: { data: any[] }) {
  const movieGenre = await db.insert(MovieGenreTable).values(data);
  return movieGenre;
}

export { bulkInsertMovieGenre };
