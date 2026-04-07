import { FastifyInstance } from "fastify";
import {
  getAllMovies,
  getAllMoviesCursorPagination,
} from "../contoller/movie.controller";
import { request } from "http";

export default async function (fastify: FastifyInstance) {
  fastify.post("/", async function (request, reply) {
    return getAllMovies(request, reply);
  });

  fastify.post("/cursor", async function (request, reply) {
    return getAllMoviesCursorPagination(request, reply);
  });
}
