import {
  getAllMovies,
  getAllMoviesCursorPagination,
} from "@video-tube/database/repos";

const pageSize = 1000;

async function cursorBasedPagination() {
  let cursor: any = null;
  while (true) {
    const { movies, cursor: newCursor } = await getAllMoviesCursorPagination({
      pageSize,
      cursor,
    });

    if (!movies || movies.length === 0) {
      break;
    }

    cursor = newCursor;
  }
}

async function offsetBasedPagination() {
  let page = 1;
  while (true) {
    const { movies } = await getAllMovies({
      page,
      pageSize,
    });

    if (!movies || movies.length === 0) {
      break;
    }

    page++;
  }
}

async function script() {
  const cursorStartTime = Date.now();
  await cursorBasedPagination();
  const cursorEndTime = Date.now();
  const cursorTime = cursorEndTime - cursorStartTime;

  console.log("Cursor Pagination Completed");

  const offsetStartTime = Date.now();
  await offsetBasedPagination();
  const offsetEndTime = Date.now();
  const offsetTime = offsetEndTime - offsetStartTime;

  console.log("Offset Pagination Completed");

  console.log("\n\n------------------------------------\n\n");

  console.log("Cursor Time(ms): ", cursorTime);
  console.log("Offset Time(ms): ", offsetTime);
}

script();
