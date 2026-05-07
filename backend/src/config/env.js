/**
 * config/env.js
 * -----------------------------------------------------------------------------
 * Camada de configuração: centraliza variáveis de ambiente para que nenhum
 * outro arquivo precise acessar process.env diretamente (Single Source of Truth
 * — princípio SOLID de responsabilidade única).
 */
module.exports = {
  port: Number(process.env.PORT) || 4000,
  tmdb: {
    apiKey: process.env.TMDB_API_KEY,
    baseUrl: process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3',
    language: process.env.TMDB_LANGUAGE || 'pt-BR',
    imageBase: process.env.TMDB_IMAGE_BASE || 'https://image.tmdb.org/t/p',
  },
};
