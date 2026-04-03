import { FastifyReply, FastifyRequest } from "fastify";
// import { db } from "@video-tube/database";
// import { MovieTable } from "@video-tube/database/schema";
import { getAllMovies as getAllMoviesRepo, getMovieDetails } from "@video-tube/database/repos";

export async function getAllMovies(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    // const movies = await db.select().from(MovieTable);
    const movies = await getAllMoviesRepo();
    reply.send(movies);
  } catch (error) {
    reply.send(error);
  }
}
