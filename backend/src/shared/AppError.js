/**
 * shared/AppError.js
 * -----------------------------------------------------------------------------
 * Erro de aplicação com statusCode HTTP. Permite que services/repositories
 * sinalizem falhas de negócio (ex.: 404 "Filme não encontrado") sem que o
 * controller precise saber detalhes do erro — basta repassar com next(err).
 */
class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

module.exports = AppError;
