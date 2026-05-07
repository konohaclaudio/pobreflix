/**
 * shared/tmdbHttpClient.js
 * -----------------------------------------------------------------------------
 * Instância única de cliente HTTP (axios) configurada para a TMDb.
 * Mantém em UM lugar a baseURL, a API key e o idioma — assim os repositories
 * só precisam saber QUAL endpoint chamar, não COMO autenticar.
 *
 * Princípio aplicado: Dependency Inversion — a camada de domínio depende
 * apenas de uma abstração (axios.get), não da configuração concreta.
 */
const axios = require('axios');
const env = require('../config/env');

const tmdbHttpClient = axios.create({
  baseURL: env.tmdb.baseUrl,
  params: {
    api_key: env.tmdb.apiKey,
    language: env.tmdb.language,
  },
  timeout: 10000,
});

module.exports = tmdbHttpClient;
