/**
 * server.js
 * -----------------------------------------------------------------------------
 * Ponto de entrada da aplicação. Apenas inicia o servidor HTTP — toda a
 * configuração do Express está isolada em src/app.js para facilitar testes
 * e respeitar a separação de responsabilidades.
 */
require('dotenv').config();

const app = require('./src/app');
const env = require('./src/config/env');

app.listen(env.port, () => {
  console.log(`[Pobreflix] Backend rodando em http://localhost:${env.port}`);
});
