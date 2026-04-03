import { FastifyInstance } from "fastify";
import { getAllMovies } from "../contoller/movie.controller";

export default async function (fastify: FastifyInstance) {
  fastify.get("/", async function (request, reply) {
    return getAllMovies(request, reply);
  });
}