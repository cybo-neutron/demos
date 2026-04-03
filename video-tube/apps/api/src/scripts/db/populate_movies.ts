import { bulkInsertMovies } from "@video-tube/database/repos";
import { MovieInsertType } from "@video-tube/database/schema";
import csvParser from "csv-parser";
import fs from "fs";
import path from "path";

function script() {
  const filePath = path.join(
    "/Users/neer/Documents",
    "misc",
    "movies_metadata.csv",
  );

  const batch: MovieInsertType[] = [];

  const safeParse = (str: string) => {
    try {
      if (!str || str === "" || str === "[]") return [];
      // Use Function constructor to safely parse Python-style literals (single quotes)
      // This handles apostrophes like "Cote D'Ivoire" correctly.
      return new Function(`return ${str}`)();
    } catch (e) {
      return [];
    }
  };

  const genresMap: Record<number, string> = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const stream = fs.createReadStream(filePath).pipe(csvParser());

  stream
    .on("data", async (row) => {
      const pdCountries = safeParse(row.production_countries);
      const productionCountries = Array.isArray(pdCountries)
        ? pdCountries.map((item: any) => item.name)
        : [];
      console.log(productionCountries)

      const movie: MovieInsertType = {
        title: row.title,
        description: row.overview,
        source: "tmdb",
        genres: safeParse(row.genres),
        posterPath: row.poster_path,
        tagline: row.tagline,
        releaseDate: row.release_date,
        productionCountries,
        productionCompanies: safeParse(row.production_companies),
        tmdbId: row.id,
      };

      // use https://image.tmdb.org/t/p/w500/kqHypb4MdEBUFiphf49bK99T4cn.j
      // https://image.tmdb.org/t/p/original/kqHypb4MdEBUFiphf49bK99T4cn.jpg
      batch.push(movie);

      if (batch.length === 100) {
        stream.pause();

        await bulkInsertMovies({ data: batch });
        console.log(`Inserted batch of ${batch.length} movies`);
        batch.length = 0;
        stream.resume();
      }
    })
    .on("end", async () => {
      if (batch.length > 0) {
        await bulkInsertMovies({ data: batch });
        console.log(`Inserted final batch of ${batch.length} movies`);
      }
      console.log("Done");
    })
    .on("error", (error) => {
      console.log(error);
    });
}

console.log("Starting script");
script();
console.log("Script finished");

/*

28: 'Action'
12: 'Adventure'
16: 'Animation'
35: 'Comedy'
80: 'Crime'
99: 'Documentary'
18: 'Drama'
10751: 'Family'
14: 'Fantasy'
36: 'History'
27: 'Horror'
10402: 'Music'
9648: 'Mystery'
10749: 'Romance'
878: 'Science Fiction'
10770: 'TV Movie'
53: 'Thriller'
10752: 'War'
37: 'Western'

*/
