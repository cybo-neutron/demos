begin;
CREATE TABLE "document_embeddings" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"embedding" vector(1024) NOT NULL,
	"uploaded_by" bigserial NOT NULL,
	"is_active" boolean NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "genre" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" text,
	"tmdb_genre_id" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "movie_genre" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"movie_id" bigserial NOT NULL,
	"genre_id" bigserial NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "movie" RENAME COLUMN "poster" TO "poster_path";--> statement-breakpoint
ALTER TABLE "movie" ALTER COLUMN "title" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "movie" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "movie" ALTER COLUMN "genres" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "movie" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "movie" ADD COLUMN "tmdb_id" text;--> statement-breakpoint
ALTER TABLE "movie" ADD COLUMN "production_companies" jsonb;--> statement-breakpoint
ALTER TABLE "movie" ADD COLUMN "release_date" text;--> statement-breakpoint
ALTER TABLE "movie" ADD COLUMN "tagline" text;--> statement-breakpoint
ALTER TABLE "document_embeddings" ADD CONSTRAINT "document_embeddings_uploaded_by_user_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movie_genre" ADD CONSTRAINT "movie_genre_movie_id_movie_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movie"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movie_genre" ADD CONSTRAINT "movie_genre_genre_id_genre_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genre"("id") ON DELETE no action ON UPDATE no action;
commit;