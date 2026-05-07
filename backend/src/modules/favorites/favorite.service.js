/**
 * modules/favorites/favorite.service.js
 * -----------------------------------------------------------------------------
 * SERVICE — regras de negócio dos favoritos.
 * Aqui cuidamos de:
 *  - impedir favoritar o mesmo filme duas vezes;
 *  - validar a existência do favorito antes de remover;
 *  - delegar persistência ao repository.
 */
const AppError = require('../../shared/AppError');
const favoriteRepository = require('./favorite.repository');
const { toFavoriteDTO } = require('./favorite.dto');

class FavoriteService {
  constructor(repository) {
    this.repository = repository;
  }

  list() {
    return this.repository.findAll().map(toFavoriteDTO);
  }

  add(input) {
    const existing = this.repository.findById(input.movieId);
    if (existing) {
      throw new AppError('Filme já está nos favoritos.', 409);
    }
    const created = this.repository.create(input);
    return toFavoriteDTO(created);
  }

  remove(movieId) {
    const numericId = Number(movieId);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      throw new AppError('Id de filme inválido.', 400);
    }
    const existing = this.repository.findById(numericId);
    if (!existing) {
      throw new AppError('Favorito não encontrado.', 404);
    }
    this.repository.delete(numericId);
  }
}

module.exports = new FavoriteService(favoriteRepository);
