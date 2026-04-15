import {
  bulkInsertMovieGenre,
  getAllGenres,
  getAllMoviesCursorPagination,
} from "@video-tube/database/repos";

async function script() {
  const genres = await getAllGenres();
  const genreMap = new Map<string, number>();

  for (const genre of genres) {
    genreMap.set(genre.name, genre.id);
  }

  console.log(genreMap);

  let cursor: any = null;

  while (true) {
    const moviesResult = await getAllMoviesCursorPagination({
      pageSize: 10,
      cursor,
    });
    // console.log(moviesResult)

    const { movies, cursor: newCursor } = moviesResult;

    if (!movies || movies.length === 0) {
      break;
    }

    cursor = newCursor;

    const movieGenreData: { movieId: number; genreId: number }[] = [];

    for (const movie of movies) {
      if (!movie.genres) {
        continue;
      }
      const genres = movie.genres as unknown as { name: string }[];
      for (const genre of genres) {
        const genreId = genreMap.get(genre.name);
        if (!genreId) {
          continue;
        }
        movieGenreData.push({
          movieId: movie.id,
          genreId,
        });
      }
    }

    // movies.forEach((movie) => {
    //   if (!movie.genres) {
    //     return;
    //     }
    //     const genres = movie.genres as unknown as { name: string }[];
    //     return genres.map((genre) => {
    //       return {
    //         movieId: movie.id,
    //         genreId: genreMap.get(genre.name),
    //       };
    //     });
    //   })
    //   .filter((item) => item !== null)
    //   .flat();
    if (movieGenreData.length === 0) {
      continue;
    }

    try {
      await bulkInsertMovieGenre({ data: movieGenreData });
    } catch (error) {
      console.log(movieGenreData);
      console.log(error);
      throw error;
    }
  }

  console.log("Done");
}

script();
