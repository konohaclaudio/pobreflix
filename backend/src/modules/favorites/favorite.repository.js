/**
 * modules/favorites/favorite.repository.js
 * -----------------------------------------------------------------------------
 * REPOSITORY — persistência de favoritos.
 * Para manter o projeto didático e sem dependência de banco real, usamos um
 * "banco em memória" (Map). A interface, porém, é a mesma que usaríamos com
 * Mongo/Postgres — então trocar a implementação no futuro não afeta o service
 * (Liskov Substitution / Dependency Inversion).
 */
const Favorite = require('./favorite.model');

class FavoriteRepository {
  constructor() {
    /** @type {Map<number, Favorite>} */
    this.store = new Map();
  }

  findAll() {
    // Mais novos primeiro
    return Array.from(this.store.values()).sort(
      (a, b) => new Date(b.addedAt) - new Date(a.addedAt),
    );
  }

  findById(movieId) {
    return this.store.get(movieId) || null;
  }

  create(data) {
    const favorite = new Favorite(data);
    this.store.set(favorite.movieId, favorite);
    return favorite;
  }

  delete(movieId) {
    return this.store.delete(movieId);
  }
}

module.exports = new FavoriteRepository();
