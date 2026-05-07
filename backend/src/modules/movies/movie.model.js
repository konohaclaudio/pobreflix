/**
 * modules/movies/movie.model.js
 * -----------------------------------------------------------------------------
 * MODEL — descreve a estrutura interna de um Filme dentro do nosso domínio.
 * É independente do formato bruto do TMDb (que é traduzido pelo repository).
 *
 * Mantemos como uma classe simples para deixar explícitos os campos que
 * a aplicação realmente usa.
 */
class Movie {
  constructor({
    id,
    title,
    originalTitle,
    overview,
    posterPath,
    backdropPath,
    releaseDate,
    voteAverage,
    genres = [],
    runtime = null,
  }) {
    this.id = id;
    this.title = title;
    this.originalTitle = originalTitle;
    this.overview = overview;
    this.posterPath = posterPath;
    this.backdropPath = backdropPath;
    this.releaseDate = releaseDate;
    this.voteAverage = voteAverage;
    this.genres = genres;
    this.runtime = runtime;
  }
}

module.exports = Movie;
