import { FastifyReply, FastifyRequest } from "fastify";
// import { db } from "@video-tube/database";
// import { MovieTable } from "@video-tube/database/schema";
import {
  getAllMovies as getAllMoviesRepo,
  getAllMoviesCursorPagination as getAllMoviesCursorPaginationRepo,
  getMovieDetails,
} from "@video-tube/database/repos";
import z from "zod";

export async function getAllMovies(req: FastifyRequest, reply: FastifyReply) {
  try {
    const schema = z.object({
      page: z.coerce.number(),
      pageSize: z.coerce.number(),
      search: z.string().optional(),
      genres: z.array(z.string()).optional(),
      countries: z.array(z.string()).optional(),
      companies: z.array(z.string()).optional(),
      sortBy: z
        .array(z.tuple([z.string(), z.enum(["asc", "desc"])]))
        .optional(),
      // releaseDateRange
    });

    const parsedData = schema.safeParse(req.body);

    if (!parsedData.success) {
      return reply.status(400).send({
        message: "Invalid data",
        errors: parsedData.error.issues,
      });
    }

    const { page, pageSize, search, genres, countries, companies, sortBy } =
      parsedData.data;

    const { movies, total } = await getAllMoviesRepo({
      page,
      pageSize,
      search,
    });

    const result = movies.map((movie) => {
      return {
        ...movie,
        imageUrl: movie.posterPath
          ? `https://image.tmdb.org/t/p/original${movie.posterPath}`
          : "",
      };
    });

    reply.send({
      payload: result,
      metadata: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    reply.send(error);
  }
}

export async function getAllMoviesCursorPagination(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const schema = z.object({
      pageSize: z.coerce.number(),
      search: z.string().optional(),
      genres: z.array(z.string()).optional(),
      countries: z.array(z.string()).optional(),
      companies: z.array(z.string()).optional(),
      sortBy: z
        .array(z.tuple([z.string(), z.enum(["asc", "desc"])]))
        .optional(),
      cursor: z.any(),
      // releaseDateRange
    });

    const parsedData = schema.safeParse(req.body);

    if (!parsedData.success) {
      return reply.status(400).send({
        message: "Invalid data",
        errors: parsedData.error.issues,
      });
    }

    const { pageSize, search, genres, countries, companies, sortBy, cursor } =
      parsedData.data;

    const { movies, cursor: newCursor } =
      await getAllMoviesCursorPaginationRepo({
        pageSize,
        search,
        cursor,
      });

    const moviesResult = movies.map((movie: any) => {
      return {
        ...movie,
        imageUrl: movie.posterPath
          ? `https://image.tmdb.org/t/p/original${movie.posterPath}`
          : "",
      };
    });

    reply.status(200).send({
      payload: moviesResult,
      metadata: {
        cursor: newCursor,
      },
    });
  } catch (error) {
    console.log(error);
    reply.status(500).send({
      message: "Something went wrong",
    });
  }
}
