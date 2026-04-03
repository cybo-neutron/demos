begin;
CREATE TYPE "public"."source" AS ENUM('tmdb', 'hianime');--> statement-breakpoint
CREATE TABLE "movie" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"genres" jsonb NOT NULL,
	"poster" text NOT NULL,
	"source" "source" NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
commit;