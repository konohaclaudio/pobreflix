/**
 * modules/movies/movie.service.js
 * -----------------------------------------------------------------------------
 * SERVICE — onde mora a regra de negócio. Validações, orquestração de chamadas
 * e qualquer transformação que não seja meramente "formato de saída" devem
 * ficar aqui. O controller chama o service; o service chama o repository.
 *
 * Mantemos o service como uma classe que recebe seu repositório por
 * construtor — facilita troca/mocks (Dependency Inversion).
 */
const AppError = require('../../shared/AppError');
const movieRepository = require('./movie.repository');
const { toMovieDTO } = require('./movie.dto');

class MovieService {
  constructor(repository) {
    this.repository = repository;
  }

  async search(query) {
    if (!query || !query.trim()) {
      throw new AppError('Parâmetro "q" é obrigatório para a busca.', 400);
    }
    const movies = await this.repository.search(query.trim());
    return movies.map(toMovieDTO);
  }

  async getTrending() {
    const movies = await this.repository.trending();
    return movies.map(toMovieDTO);
  }

  async getTopRated() {
    const movies = await this.repository.topRated();
    return movies.map(toMovieDTO);
  }

  async getById(id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      throw new AppError('Id de filme inválido.', 400);
    }
    const movie = await this.repository.findById(numericId);
    return toMovieDTO(movie);
  }

  async getTrailer(id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      throw new AppError('Id de filme inválido.', 400);
    }
    return this.repository.getVideos(numericId);
  }

  async getSimilar(id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      throw new AppError('Id de filme inválido.', 400);
    }
    const movies = await this.repository.getSimilar(numericId);
    return movies.map(toMovieDTO);
  }

  async getCredits(id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      throw new AppError('Id de filme inválido.', 400);
    }
    return this.repository.getCredits(numericId);
  }
}

module.exports = new MovieService(movieRepository);
