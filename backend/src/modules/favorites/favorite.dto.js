/**
 * modules/favorites/favorite.dto.js
 * -----------------------------------------------------------------------------
 * DTOs do domínio "favorites":
 *  - toFavoriteDTO: serializa um Favorite para o cliente;
 *  - parseCreateFavoriteInput: valida e normaliza o body do POST /favorites.
 */
const AppError = require('../../shared/AppError');

function toFavoriteDTO(fav) {
  return {
    movieId: fav.movieId,
    title: fav.title,
    poster: fav.poster,
    rating: fav.rating,
    releaseDate: fav.releaseDate,
    addedAt: fav.addedAt,
  };
}

function parseCreateFavoriteInput(body) {
  if (!body || typeof body !== 'object') {
    throw new AppError('Corpo da requisição inválido.', 400);
  }
  const movieId = Number(body.movieId);
  if (!Number.isInteger(movieId) || movieId <= 0) {
    throw new AppError('Campo "movieId" é obrigatório e deve ser um inteiro positivo.', 400);
  }
  if (!body.title || typeof body.title !== 'string') {
    throw new AppError('Campo "title" é obrigatório.', 400);
  }
  return {
    movieId,
    title: body.title,
    poster: body.poster ?? null,
    rating: typeof body.rating === 'number' ? body.rating : null,
    releaseDate: body.releaseDate ?? null,
  };
}

module.exports = { toFavoriteDTO, parseCreateFavoriteInput };
