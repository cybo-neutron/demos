begin;
CREATE TABLE "stackoverflow_answers" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"stack_overflow_id" bigserial NOT NULL,
	"stack_overflow_user_id" bigserial NOT NULL,
	"parent_id" bigserial NOT NULL,
	"body" text,
	"closed_date" timestamp,
	"creation_date" timestamp
);
--> statement-breakpoint
CREATE TABLE "stackoverflow_questions" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"stack_overflow_id" bigserial NOT NULL,
	"stack_overflow_user_id" bigserial NOT NULL,
	"title" text,
	"body" text,
	"closed_date" timestamp,
	"creation_date" timestamp
);
--> statement-breakpoint
CREATE TABLE "stackoverflow_tags" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"stack_overflow_id" bigserial NOT NULL,
	"tag" text NOT NULL
);
commit;