import type { Movie } from "@/services/movies.service";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { Genre } from "@/services/movies.service";
import { Film } from "lucide-react";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const [hasError, setHasError] = React.useState(false);

  const showPlaceholder =
    !movie.imageUrl || movie.imageUrl.endsWith("null") || hasError;

  return (
    <Card
      key={movie.id}
      className="group overflow-hidden border-none bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col"
    >
      <CardHeader className="p-0 relative aspect-2/3 overflow-hidden bg-muted flex items-center justify-center shrink-0">

        {!showPlaceholder ? (
          <img
            src={movie.imageUrl}
            alt={movie.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            onError={() => setHasError(true)}
          />
        ) : (
          <Empty className="p-0 border-none shadow-none bg-transparent">
            <EmptyHeader className="p-0 flex flex-col items-center justify-center">
              <EmptyMedia>
                <Film className="w-12 h-12 text-muted-foreground/30" />
              </EmptyMedia>
              <EmptyTitle className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/50 px-2 mt-2">
                Poster Unavailable
              </EmptyTitle>
            </EmptyHeader>
          </Empty>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p className="text-white text-xs line-clamp-3">
            {movie.description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="p-4 bg-transparent mt-2">
        <CardTitle className="text-lg font-bold truncate group-hover:text-primary transition-colors">
          {movie.title}
        </CardTitle>
        <div className="flex flex-wrap gap-1 mt-2">
          {movie.genres?.slice(0, 2).map((genre: Genre, idx: number) => (
            <span
              key={idx}
              className="text-[10px] uppercase tracking-wider bg-secondary px-2 py-0.5 rounded text-secondary-foreground font-semibold"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-2 flex justify-between items-center bg-transparent mt-auto">
        <span className="text-xs text-muted-foreground font-medium">
          {movie.releaseDate}
        </span>
        <span className="text-xs font-bold text-primary">
          {movie.source?.toUpperCase()}
        </span>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;