/**
 * modules/favorites/favorite.model.js
 * -----------------------------------------------------------------------------
 * MODEL — estrutura de um favorito persistido. Guardamos apenas o que é
 * necessário para listar a página de Favoritos sem precisar bater de novo
 * na TMDb (id, title, poster, rating, releaseDate).
 */
class Favorite {
  constructor({ movieId, title, poster, rating, releaseDate, addedAt }) {
    this.movieId = movieId;
    this.title = title;
    this.poster = poster;
    this.rating = rating;
    this.releaseDate = releaseDate;
    this.addedAt = addedAt || new Date().toISOString();
  }
}

module.exports = Favorite;
