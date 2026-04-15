import { axiosInterceptor } from "@/lib/axiosInterceptor";

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  description: string;
  genres: Genre[];
  posterPath: string;
  imageUrl: string;
  releaseDate: string;
  tagline?: string;
  source: string;
}

export interface GetMoviesParams {
  page: number;
  pageSize: number;
  search?: string;
  genres?: string[];
  countries?: string[];
  companies?: string[];
}

export interface GetMovieCursorPaginationParams extends Omit<
  GetMoviesParams,
  "page"
> {
  cursor: Record<string, { op: string; value: string }>;
}

export interface Metadata {
  total?: number;
  page?: number;
  pageSize: number;
  totalPages?: number;
  cursor?: Record<string, { op: string; value: string }> | null;
}

export interface GetMoviesResponse {
  payload: Movie[];
  metadata: Metadata;
}

export const moviesService = {
  getMovies: async (params: GetMoviesParams): Promise<GetMoviesResponse> => {
    const response = await axiosInterceptor.request({
      method: "post",
      url: "/v1/movie",
      data: params,
    });
    return response.data;
  },

  getMoviesCursorPagination: async (
    params: GetMovieCursorPaginationParams,
  ): Promise<GetMoviesResponse> => {
    const response = await axiosInterceptor.request({
      method: "post",
      url: "/v1/movie/cursor",
      data: params,
    });
    return response.data;
  },
};
