import { getAllMoviesCursorPagination } from "@video-tube/database/repos";

async function cursorBasedPaginationTest() {}

async function offsetBasedPaginationTest() {}

async function script() {
  const movies = await getAllMoviesCursorPagination({
    pageSize: 10,
    cursor: null,
    genres: {
      genreIds: ["28"],
      useJoin: true,
    },
  });

  console.log(JSON.stringify(movies));
}

script();
