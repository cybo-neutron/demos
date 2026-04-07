
import { useQuery } from "@tanstack/react-query";
import { moviesService } from "@/services/movies.service";
import type { GetMoviesParams } from "@/services/movies.service";


export const useGetMovies = (params: GetMoviesParams) => {
  return useQuery({
    queryKey: ["movies", params],
    queryFn: () => moviesService.getMovies(params),
    placeholderData: (previousData) => previousData,
  });
};
