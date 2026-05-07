/**
 * middlewares/errorHandler.js
 * -----------------------------------------------------------------------------
 * Middleware central de tratamento de erros. Garante que toda falha tenha
 * um formato JSON consistente para o cliente, separando erros previstos
 * (AppError, com statusCode) de erros inesperados (500).
 */
const AppError = require('../shared/AppError');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, _req, res, _next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error('[Pobreflix] Erro inesperado:', err);

  return res.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor.',
  });
}

module.exports = errorHandler;
