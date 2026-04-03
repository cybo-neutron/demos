import { relations } from "drizzle-orm/relations";
import { movie, embeddings, user, documentEmbeddings, movieGenre, genre } from "./schema";

export const embeddingsRelations = relations(embeddings, ({one}) => ({
	movie: one(movie, {
		fields: [embeddings.movieId],
		references: [movie.id]
	}),
}));

export const movieRelations = relations(movie, ({many}) => ({
	embeddings: many(embeddings),
	movieGenres: many(movieGenre),
}));

export const documentEmbeddingsRelations = relations(documentEmbeddings, ({one}) => ({
	user: one(user, {
		fields: [documentEmbeddings.uploadedBy],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	documentEmbeddings: many(documentEmbeddings),
}));

export const movieGenreRelations = relations(movieGenre, ({one}) => ({
	movie: one(movie, {
		fields: [movieGenre.movieId],
		references: [movie.id]
	}),
	genre: one(genre, {
		fields: [movieGenre.genreId],
		references: [genre.id]
	}),
}));

export const genreRelations = relations(genre, ({many}) => ({
	movieGenres: many(movieGenre),
}));