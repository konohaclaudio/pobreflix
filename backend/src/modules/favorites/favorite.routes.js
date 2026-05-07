/**
 * modules/favorites/favorite.routes.js
 * -----------------------------------------------------------------------------
 * Rotas REST do domínio "favorites" (montadas em /favorites):
 *   GET    /favorites        -> lista todos os favoritos
 *   POST   /favorites        -> adiciona um filme aos favoritos
 *   DELETE /favorites/:id    -> remove um favorito pelo movieId
 */
const { Router } = require('express');
const favoriteController = require('./favorite.controller');

const router = Router();

router.get('/', (req, res, next) => favoriteController.list(req, res, next));
router.post('/', (req, res, next) => favoriteController.create(req, res, next));
router.delete('/:id', (req, res, next) => favoriteController.remove(req, res, next));

module.exports = router;
