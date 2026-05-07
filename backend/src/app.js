/**
 * src/app.js
 * -----------------------------------------------------------------------------
 * Configuração da aplicação Express. Aqui aplicamos:
 *  - middlewares globais (CORS, JSON parser);
 *  - registramos as rotas modulares (movies, favorites);
 *  - registramos o middleware de tratamento de erros (sempre por último).
 *
 * Nenhuma regra de negócio mora aqui — apenas a "fiação" da aplicação.
 */
const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Healthcheck simples — útil para verificar que o servidor está de pé.
app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'pobreflix-backend' }));

// Rotas da aplicação (agrupadas por domínio em /routes/index.js)
app.use('/', routes);

// Middleware de erro — DEVE ser o último a ser registrado.
app.use(errorHandler);

module.exports = app;
