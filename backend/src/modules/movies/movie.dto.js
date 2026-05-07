/**
 * modules/movies/movie.dto.js
 * -----------------------------------------------------------------------------
 * DTO — Data Transfer Object. Define a forma do JSON que sai pela API.
 * Funções aqui:
 *  - toMovieDTO: serializa um Movie (modelo interno) para o formato exposto;
 *  - fromTmdbMovie: traduz a resposta crua do TMDb para o nosso modelo.
 *
 * Manter essa tradução isolada protege a aplicação de mudanças no contrato
 * do TMDb (Open/Closed: se a API mudar, só este arquivo muda).
 */
const Movie = require('./movie.model');
const env = require('../../config/env');

const POSTER_SIZE = 'w500';
const BACKDROP_SIZE = 'original';

function buildImageUrl(path, size) {
  if (!path) return null;
  return `${env.tmdb.imageBase}/${size}${path}`;
}

/** Recebe o objeto cru do TMDb e devolve uma instância de Movie. */
function fromTmdbMovie(raw) {
  return new Movie({
    id: raw.id,
    title: raw.title,
    originalTitle: raw.original_title,
    overview: raw.overview,
    posterPath: raw.poster_path,
    backdropPath: raw.backdrop_path,
    releaseDate: raw.release_date,
    voteAverage: raw.vote_average,
    genres: Array.isArray(raw.genres) ? raw.genres.map((g) => g.name) : [],
    runtime: raw.runtime ?? null,
  });
}

/** Serializa o Movie para o JSON enviado ao cliente. */
function toMovieDTO(movie) {
  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.originalTitle,
    overview: movie.overview,
    poster: buildImageUrl(movie.posterPath, POSTER_SIZE),
    backdrop: buildImageUrl(movie.backdropPath, BACKDROP_SIZE),
    releaseDate: movie.releaseDate,
    rating: movie.voteAverage ? Number(movie.voteAverage.toFixed(1)) : null,
    genres: movie.genres,
    runtime: movie.runtime,
  };
}

module.exports = {
  fromTmdbMovie,
  toMovieDTO,
};
