import { useState } from "react";
import { useGetMovies, useInfiniteMovies } from "@/hooks/useGetMovies";
import { Film, LayoutGrid, Zap, ZapOff, Infinity as InfinityIcon, Boxes } from "lucide-react";
import type { Movie } from "@/services/movies.service";
import MovieCard from "./MovieCard";
import { Button } from "@/components/ui/button";

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
  const [isInfiniteScroll, setIsInfiniteScroll] = useState(false);
  const [isCursorBased, setIsCursorBased] = useState(false);
  const pageSize = 20;

  const handleCursorToggle = () => {
    const newVal = !isCursorBased;
    setIsCursorBased(newVal);
    if (newVal) {
      setIsInfiniteScroll(true);
    }
  };

  const params = {
    pageSize,
  };

  // Using standard pagination
  const { 
    data: pagedData, 
    isLoading: isPagedLoading, 
    isError: isPagedError, 
    error: pagedError, 
    isPlaceholderData 
  } = useGetMovies({ 
    page, 
    ...params 
  });

  // Using infinite scroll (handles both offset and cursor)
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isInfiniteLoading,
    isError: isInfiniteError,
    error: infiniteError,
  } = useInfiniteMovies(params, isCursorBased);

  const isLoading = isInfiniteScroll ? isInfiniteLoading : isPagedLoading;
  const isError = isInfiniteScroll ? isInfiniteError : isPagedError;
  const error = isInfiniteScroll ? infiniteError : pagedError;

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

  let movies: Movie[] = [];
  let metadata;

  if (isInfiniteScroll) {
    movies = infiniteData?.pages.flatMap((page) => page.payload) || [];
    metadata = infiniteData?.pages[0].metadata;
  } else {
    movies = pagedData?.payload || [];
    metadata = pagedData?.metadata;
  }

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

        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          Discover latest blockbusters and timeless classics from our curated
          collection.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center p-1 bg-muted/50 rounded-xl border border-border/50">
            <Button
              variant={isCursorBased ? "default" : "ghost"}
              size="sm"
              className="rounded-lg gap-2"
              onClick={handleCursorToggle}
            >
              {isCursorBased ? <Zap className="w-4 h-4 fill-primary" /> : <ZapOff className="w-4 h-4" />}
              Cursor based
            </Button>
            <Button
              variant={!isCursorBased ? "default" : "ghost"}
              size="sm"
              className="rounded-lg gap-2"
              onClick={() => setIsCursorBased(false)}
            >
              <Boxes className="w-4 h-4" />
              Offset based
            </Button>
          </div>

          <div className="flex items-center p-1 bg-muted/50 rounded-xl border border-border/50">
            <Button
              variant={isInfiniteScroll ? "default" : "ghost"}
              size="sm"
              className="rounded-lg gap-2"
              disabled={isCursorBased}
              onClick={() => setIsInfiniteScroll(true)}
            >
              <InfinityIcon className="w-4 h-4" />
              Infinite Scroll
            </Button>
            <Button
              variant={!isInfiniteScroll ? "default" : "ghost"}
              size="sm"
              className="rounded-lg gap-2"
              disabled={isCursorBased}
              onClick={() => setIsInfiniteScroll(false)}
            >
              <LayoutGrid className="w-4 h-4" />
              Standard Paging
            </Button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie: Movie, index: number) => (
          <MovieCard key={`${movie.id}-${index}`} movie={movie} />
        ))}
      </div>

      {movies.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No movies found.</p>
        </div>
      )}

      {isInfiniteScroll && hasNextPage && (
        <div className="flex justify-center mt-12 py-8 border-t border-border/50">
          <Button
            size="lg"
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="rounded-full px-8 gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            {isFetchingNextPage ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent animate-spin rounded-full" />
            ) : (
              <InfinityIcon className="w-5 h-5" />
            )}
            Load more movies
          </Button>
        </div>
      )}

      {!isInfiniteScroll && totalPages > 1 && (
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
