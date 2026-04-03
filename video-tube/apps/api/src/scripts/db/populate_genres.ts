import { bulkInsertGenres } from "@video-tube/database/repos";

async function script() {
  const genres = [
    { name: "Action", tmdbGenreId: "28" },
    { name: "Adventure", tmdbGenreId: "12" },
    { name: "Animation", tmdbGenreId: "16" },
    { name: "Comedy", tmdbGenreId: "35" },
    { name: "Crime", tmdbGenreId: "80" },
    { name: "Documentary", tmdbGenreId: "99" },
    { name: "Drama", tmdbGenreId: "18" },
    { name: "Family", tmdbGenreId: "10751" },
    { name: "Fantasy", tmdbGenreId: "14" },
    { name: "History", tmdbGenreId: "36" },
    { name: "Horror", tmdbGenreId: "27" },
    { name: "Music", tmdbGenreId: "10402" },
    { name: "Mystery", tmdbGenreId: "9648" },
    { name: "Romance", tmdbGenreId: "10749" },
    { name: "Science Fiction", tmdbGenreId: "878" },
    { name: "TV Movie", tmdbGenreId: "10770" },
    { name: "Thriller", tmdbGenreId: "53" },
    { name: "War", tmdbGenreId: "10752" },
    { name: "Western", tmdbGenreId: "37" },
  ];

  await bulkInsertGenres({ data: genres });

  console.log("Genres populated successfully")
}

script();


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