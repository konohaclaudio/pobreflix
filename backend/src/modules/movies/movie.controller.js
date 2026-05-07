/**
 * modules/movies/movie.controller.js
 * -----------------------------------------------------------------------------
 * CONTROLLER — camada de entrada HTTP. Sua única responsabilidade é:
 *  1. extrair dados da request (params/query/body);
 *  2. chamar o service correspondente;
 *  3. devolver a resposta HTTP.
 *
 * Nenhuma regra de negócio, nenhuma chamada externa — apenas "tradução"
 * entre o protocolo HTTP e o domínio.
 */
const movieService = require('./movie.service');

class MovieController {
  async search(req, res, next) {
    try {
      const { q } = req.query;
      const movies = await movieService.search(q);
      return res.json({ results: movies });
    } catch (err) {
      return next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const movie = await movieService.getById(req.params.id);
      return res.json(movie);
    } catch (err) {
      return next(err);
    }
  }

  async getTrending(_req, res, next) {
    try {
      const movies = await movieService.getTrending();
      return res.json({ results: movies });
    } catch (err) {
      return next(err);
    }
  }

  async getTopRated(_req, res, next) {
    try {
      const movies = await movieService.getTopRated();
      return res.json({ results: movies });
    } catch (err) {
      return next(err);
    }
  }

  async getTrailer(req, res, next) {
    try {
      const trailer = await movieService.getTrailer(req.params.id);
      return res.json({ trailer });
    } catch (err) {
      return next(err);
    }
  }

  async getSimilar(req, res, next) {
    try {
      const movies = await movieService.getSimilar(req.params.id);
      return res.json({ results: movies });
    } catch (err) {
      return next(err);
    }
  }

  async getCredits(req, res, next) {
    try {
      const credits = await movieService.getCredits(req.params.id);
      return res.json(credits);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new MovieController();
