begin;
ALTER TABLE "genre" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "movie_genre" ALTER COLUMN "movie_id" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "movie_genre" ALTER COLUMN "movie_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "movie_genre" ALTER COLUMN "genre_id" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "movie_genre" ALTER COLUMN "genre_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "movie_genre" ALTER COLUMN "updated_at" SET DEFAULT now();
commit;