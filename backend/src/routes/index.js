/**
 * routes/index.js
 * -----------------------------------------------------------------------------
 * Agregador de rotas. Cada módulo de domínio expõe seu próprio Router e este
 * arquivo apenas os monta nos seus prefixos. Mantém o app.js enxuto.
 */
const { Router } = require('express');

const movieRoutes = require('../modules/movies/movie.routes');
const favoriteRoutes = require('../modules/favorites/favorite.routes');

const router = Router();

router.use('/movies', movieRoutes);
router.use('/favorites', favoriteRoutes);

module.exports = router;
