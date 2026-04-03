import { pgTable, bigserial, text, jsonb, boolean, timestamp, foreignKey, vector, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const source = pgEnum("source", ['tmdb', 'hianime'])


export const movie = pgTable("movie", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	title: text(),
	description: text(),
	genres: jsonb(),
	posterPath: text("poster_path"),
	source: source().notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	tmdbId: text("tmdb_id"),
	productionCompanies: jsonb("production_companies"),
	releaseDate: text("release_date"),
	tagline: text(),
	productionCountries: jsonb("production_countries"),
});

export const embeddings = pgTable("embeddings", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	movieId: bigserial("movie_id", { mode: "bigint" }).notNull(),
	embedding: vector({ dimensions: 1024 }),
}, (table) => [
	foreignKey({
			columns: [table.movieId],
			foreignColumns: [movie.id],
			name: "embeddings_movie_id_fkey"
		}),
]);

export const genre = pgTable("genre", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	name: text(),
	tmdbGenreId: text("tmdb_genre_id"),
	isActive: boolean("is_active").default(true).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
});

export const user = pgTable("user", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});

export const documentEmbeddings = pgTable("document_embeddings", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	content: text().notNull(),
	embedding: vector({ dimensions: 1024 }).notNull(),
	uploadedBy: bigserial("uploaded_by", { mode: "bigint" }),
	isActive: boolean("is_active").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.uploadedBy],
			foreignColumns: [user.id],
			name: "document_embeddings_uploaded_by_user_id_fk"
		}),
]);

export const movieGenre = pgTable("movie_genre", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	movieId: bigserial("movie_id", { mode: "bigint" }).notNull(),
	genreId: bigserial("genre_id", { mode: "bigint" }).notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.movieId],
			foreignColumns: [movie.id],
			name: "movie_genre_movie_id_movie_id_fk"
		}),
	foreignKey({
			columns: [table.genreId],
			foreignColumns: [genre.id],
			name: "movie_genre_genre_id_genre_id_fk"
		}),
]);

export const stackoverflowAnswers = pgTable("stackoverflow_answers", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	stackOverflowId: bigserial("stack_overflow_id", { mode: "bigint" }).notNull(),
	stackOverflowUserId: bigserial("stack_overflow_user_id", { mode: "bigint" }).notNull(),
	parentId: bigserial("parent_id", { mode: "bigint" }).notNull(),
	body: text(),
	closedDate: timestamp("closed_date", { mode: 'string' }),
	creationDate: timestamp("creation_date", { mode: 'string' }),
});

export const stackoverflowQuestions = pgTable("stackoverflow_questions", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	stackOverflowId: bigserial("stack_overflow_id", { mode: "bigint" }).notNull(),
	stackOverflowUserId: bigserial("stack_overflow_user_id", { mode: "bigint" }).notNull(),
	title: text(),
	body: text(),
	closedDate: timestamp("closed_date", { mode: 'string' }),
	creationDate: timestamp("creation_date", { mode: 'string' }),
});

export const stackoverflowTags = pgTable("stackoverflow_tags", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	stackOverflowId: bigserial("stack_overflow_id", { mode: "bigint" }).notNull(),
	tag: text().notNull(),
});
