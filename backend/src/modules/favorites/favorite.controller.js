/**
 * modules/favorites/favorite.controller.js
 * -----------------------------------------------------------------------------
 * CONTROLLER — entrada HTTP do domínio "favorites". Não contém regra alguma:
 * apenas extrai dados da request, chama o service e devolve a resposta.
 */
const favoriteService = require('./favorite.service');
const { parseCreateFavoriteInput } = require('./favorite.dto');

class FavoriteController {
  list(_req, res, next) {
    try {
      const favorites = favoriteService.list();
      return res.json({ results: favorites });
    } catch (err) {
      return next(err);
    }
  }

  create(req, res, next) {
    try {
      const input = parseCreateFavoriteInput(req.body);
      const favorite = favoriteService.add(input);
      return res.status(201).json(favorite);
    } catch (err) {
      return next(err);
    }
  }

  remove(req, res, next) {
    try {
      favoriteService.remove(req.params.id);
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new FavoriteController();
