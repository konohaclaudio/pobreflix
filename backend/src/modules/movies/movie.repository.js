/**
 * modules/movies/movie.repository.js
 * -----------------------------------------------------------------------------
 * REPOSITORY — única camada autorizada a falar com a fonte de dados externa
 * (no nosso caso, a API do TMDb). Devolve sempre instâncias do nosso modelo
 * Movie (já traduzido pelo DTO), nunca o JSON cru da TMDb.
 *
 * Princípios:
 *  - Single Responsibility: só sabe buscar dados;
 *  - Dependency Inversion: o service consome a interface deste módulo,
 *    não o axios diretamente. Trocar TMDb por outra fonte = alterar só aqui.
 */
const tmdb = require('../../shared/tmdbHttpClient');
const AppError = require('../../shared/AppError');
const { fromTmdbMovie } = require('./movie.dto');

class MovieRepository {
  /** Busca filmes por termo (q). Retorna lista de Movie. */
  async search(query) {
    try {
      const { data } = await tmdb.get('/search/movie', {
        params: { query, include_adult: false, page: 1 },
      });
      return (data.results || []).map(fromTmdbMovie);
    } catch (err) {
      throw new AppError('Falha ao buscar filmes na TMDb.', 502);
    }
  }

  /** Busca filmes em alta — usado para popular a Home. */
  async trending() {
    try {
      const { data } = await tmdb.get('/trending/movie/week');
      return (data.results || []).map(fromTmdbMovie);
    } catch (err) {
      throw new AppError('Falha ao buscar filmes em alta.', 502);
    }
  }

  /** Filmes mais bem avaliados — outro carrossel da Home. */
  async topRated() {
    try {
      const { data } = await tmdb.get('/movie/top_rated', { params: { page: 1 } });
      return (data.results || []).map(fromTmdbMovie);
    } catch (err) {
      throw new AppError('Falha ao buscar filmes mais bem avaliados.', 502);
    }
  }

  /** Detalhes completos de um filme por id. */
  async findById(id) {
    try {
      const { data } = await tmdb.get(`/movie/${id}`);
      return fromTmdbMovie(data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        throw new AppError('Filme não encontrado.', 404);
      }
      throw new AppError('Falha ao buscar detalhes do filme.', 502);
    }
  }

  /** Trailer oficial do YouTube via TMDb /videos. */
  async getVideos(id) {
    try {
      const { data } = await tmdb.get(`/movie/${id}/videos`);
      const trailers = (data.results || []).filter(
        (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'),
      );
      return trailers.length ? trailers[0] : null;
    } catch (err) {
      return null;
    }
  }

  /** Filmes similares ao dado id. */
  async getSimilar(id) {
    try {
      const { data } = await tmdb.get(`/movie/${id}/similar`, { params: { page: 1 } });
      return (data.results || []).slice(0, 12).map(fromTmdbMovie);
    } catch (err) {
      return [];
    }
  }

  /** Elenco e equipe técnica. */
  async getCredits(id) {
    try {
      const { data } = await tmdb.get(`/movie/${id}/credits`);
      const cast = (data.cast || []).slice(0, 10).map((p) => ({
        id: p.id,
        name: p.name,
        character: p.character,
        photo: p.profile_path
          ? `https://image.tmdb.org/t/p/w185${p.profile_path}`
          : null,
      }));
      const director = (data.crew || []).find((c) => c.job === 'Director');
      return {
        cast,
        director: director ? director.name : null,
      };
    } catch (err) {
      return { cast: [], director: null };
    }
  }
}

// Exporta uma instância única (suficiente para nosso caso e mais fácil
// de mockar em testes sem precisar de container de DI).
module.exports = new MovieRepository();
