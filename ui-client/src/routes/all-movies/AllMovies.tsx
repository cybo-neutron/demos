import { useState } from "react";
import { useGetMovies } from "@/hooks/useGetMovies";
import { Film } from "lucide-react";
import type { Movie } from "@/services/movies.service";
import MovieCard from "./MovieCard";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const AllMovies = () => {
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data, isLoading, isError, error, isPlaceholderData } = useGetMovies({
    page,
    pageSize,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-destructive">
        <p className="text-xl font-bold">Error loading movies</p>
        <p className="text-sm">{(error as Error).message}</p>
      </div>
    );
  }

  const movies: Movie[] = data?.payload || [];
  const metadata = data?.metadata;
  const totalPages = metadata?.totalPages || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-10 text-center relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-10 blur-2xl flex justify-center items-center">
          <Film className="w-48 h-48 text-primary animate-pulse" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent flex items-center justify-center gap-3">
          <Film className="w-10 h-10 text-primary" />
          Explore Movies
        </h1>

        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Discover latest blockbusters and timeless classics from our curated
          collection.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {movies.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No movies found.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-border pt-8">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{(page - 1) * pageSize + 1}</span> to{" "}
            <span className="font-medium text-foreground">
              {Math.min(page * pageSize, metadata?.total || 0)}
            </span>{" "}
            of <span className="font-medium text-foreground">{metadata?.total}</span> movies
          </div>
          
          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setPage((old) => Math.max(old - 1, 1))}
                  className={page === 1 || isPlaceholderData ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (page <= 3) {
                  pageNumber = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = page - 2 + i;
                }
                
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      onClick={() => setPage(pageNumber)}
                      isActive={page === pageNumber}
                      className="cursor-pointer"
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {totalPages > 5 && page < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext 
                  onClick={() => {
                    if (!isPlaceholderData && page < totalPages) {
                      setPage((old) => old + 1);
                    }
                  }}
                  className={page === totalPages || isPlaceholderData ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}



    </div>
  );
};

export default AllMovies;
