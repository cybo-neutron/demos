import { useQuery, useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { moviesService } from "@/services/movies.service";
import type { GetMoviesParams, GetMoviesResponse } from "@/services/movies.service";

export const useGetMovies = (params: GetMoviesParams) => {
  return useQuery({
    queryKey: ["movies", params],
    queryFn: () => moviesService.getMovies(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useInfiniteMovies = (
  params: Omit<GetMoviesParams, "page">,
  isCursorBased: boolean
) => {
  return useInfiniteQuery<
    GetMoviesResponse,
    Error,
    InfiniteData<GetMoviesResponse>,
    unknown[],
    number | Record<string, { op: string; value: string }> | null
  >({
    queryKey: ["movies-infinite", params, isCursorBased],
    queryFn: ({ pageParam }) => {
      if (isCursorBased) {
        return moviesService.getMoviesCursorPagination({
          ...params,
          cursor: pageParam as Record<string, { op: string; value: string }>,
        });
      } else {
        return moviesService.getMovies({
          ...params,
          page: (pageParam as number) ?? 1,
        });
      }
    },
    initialPageParam: isCursorBased ? null : 1,
    getNextPageParam: (lastPage) => {
      if (isCursorBased) {
        return lastPage.metadata.cursor || undefined;
      } else {
        const { page, totalPages } = lastPage.metadata;
        if (page !== undefined && totalPages !== undefined && page < totalPages) {
          return page + 1;
        }
        return undefined;
      }
    },
  });
};
