import { FastifyInstance } from "fastify";
import movieRoute from "./movie.route";

export default async function (fastify: FastifyInstance) {
  fastify.register(movieRoute, {
    prefix: "/v1/movie",
  });
}
