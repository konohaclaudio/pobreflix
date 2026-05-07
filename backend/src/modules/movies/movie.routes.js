/**
 * modules/movies/movie.routes.js
 * -----------------------------------------------------------------------------
 * Define as rotas HTTP do domínio "movies" e amarra cada uma ao controller.
 * Manter as rotas separadas por domínio facilita ler e evoluir a API.
 *
 * Endpoints expostos (montados em /movies):
 *   GET /movies/search?q=...   -> busca por termo
 *   GET /movies/trending       -> filmes em alta (extra usado pela Home)
 *   GET /movies/top-rated      -> mais bem avaliados (extra usado pela Home)
 *   GET /movies/:id            -> detalhes de um filme
 */
const { Router } = require('express');
const movieController = require('./movie.controller');

const router = Router();

router.get('/search',    (req, res, next) => movieController.search(req, res, next));
router.get('/trending',  (req, res, next) => movieController.getTrending(req, res, next));
router.get('/top-rated', (req, res, next) => movieController.getTopRated(req, res, next));
router.get('/:id/trailer', (req, res, next) => movieController.getTrailer(req, res, next));
router.get('/:id/similar', (req, res, next) => movieController.getSimilar(req, res, next));
router.get('/:id/credits', (req, res, next) => movieController.getCredits(req, res, next));
router.get('/:id',       (req, res, next) => movieController.getById(req, res, next));

module.exports = router;
