# 🎬 Pobreflix

Catálogo de filmes fullstack inspirado na Netflix — consome a API do TMDb, interface dark estilo streaming, arquitetura em camadas e princípios SOLID.

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![TMDb](https://img.shields.io/badge/TMDb-API-01B4E4?style=flat-square&logo=themoviedatabase&logoColor=white)](https://www.themoviedb.org)

---

## Sobre o projeto

O **Pobreflix** é um projeto fullstack didático que simula um serviço de streaming. A ideia é mostrar na prática como construir uma aplicação real com:

- **Backend** organizado em camadas (Controller → Service → Repository → DTO → Model)
- **Frontend** React com hooks customizados, Context API e separação por responsabilidade
- **Arquitetura** baseada nos princípios SOLID aplicados a um projeto do mundo real

> Projeto construído para fins educacionais. Ótimo para quem está aprendendo Node.js e React e quer ver como os conceitos se conectam.

---

## Funcionalidades

- Tela inicial com filmes em alta e mais bem avaliados (estilo Netflix)
- Busca de filmes em tempo real
- Página de detalhes com sinopse, elenco, trailer e filmes similares
- Lista de favoritos — adicionar e remover
- Skeleton loading em todas as listas
- Design dark responsivo

---

## Stack

| Camada   | Tecnologia                                    |
| -------- | --------------------------------------------- |
| Frontend | React 18, Vite 5, React Router 6              |
| Backend  | Node.js 18+, Express 4                        |
| HTTP     | Axios                                         |
| Dados    | TMDb API (filmes), Map em memória (favoritos) |
| Dev      | Nodemon                                       |

---

## Arquitetura do backend

O backend segue arquitetura em camadas. Cada camada tem uma responsabilidade única e só se comunica com a camada imediatamente abaixo.

```text
Requisição HTTP
      │
      ▼
 ┌─────────────┐
 │  Controller │  → extrai dados do req, devolve res. Sem regra de negócio.
 └──────┬──────┘
        │
        ▼
 ┌─────────────┐
 │   Service   │  → validações, regras de negócio, orquestra o fluxo.
 └──────┬──────┘
        │
        ▼
 ┌─────────────┐
 │ Repository  │  → único lugar que fala com TMDb ou banco. Traduz dado externo.
 └──────┬──────┘
        │
        ▼
 ┌─────────────┐
 │  Model/DTO  │  → estrutura interna do dado e formato de saída para o front.
 └─────────────┘
```

### SOLID aplicado

| Princípio | Como aparece no projeto |
| --- | --- |
| **S** — Single Responsibility | Cada arquivo faz uma coisa: controller só HTTP, service só regra, repository só dados |
| **O** — Open/Closed | Novo módulo (`series/`) sem tocar em `movies/` ou `favorites/` |
| **L** — Liskov Substitution | `FavoriteRepository` usa `Map` hoje; pode virar MongoDB sem mudar o service |
| **I** — Interface Segregation | `parseCreateFavoriteInput` e `toFavoriteDTO` são funções separadas, independentes |
| **D** — Dependency Inversion | `MovieService` recebe o repository pelo construtor — fácil de mockar em testes |

---

## Estrutura de pastas

```text
pobreflix/
│
├── backend/
│   ├── server.js                    # bootstrap — lê .env e sobe o servidor
│   ├── .env.example                 # variáveis necessárias
│   └── src/
│       ├── app.js                   # monta o Express (middlewares + rotas)
│       ├── config/env.js            # centraliza process.env
│       ├── routes/index.js          # agrega todas as rotas
│       ├── middlewares/
│       │   └── errorHandler.js      # tratamento global de erros → JSON
│       ├── shared/
│       │   ├── AppError.js          # erro com statusCode HTTP
│       │   └── tmdbHttpClient.js    # axios pré-configurado para TMDb
│       └── modules/
│           ├── movies/
│           │   ├── movie.model.js
│           │   ├── movie.dto.js          # fromTmdbMovie + toMovieDTO
│           │   ├── movie.repository.js   # busca na TMDb
│           │   ├── movie.service.js      # regras de busca
│           │   ├── movie.controller.js
│           │   └── movie.routes.js
│           └── favorites/
│               ├── favorite.model.js
│               ├── favorite.dto.js
│               ├── favorite.repository.js  # Map em memória
│               ├── favorite.service.js     # evita duplicatas
│               ├── favorite.controller.js
│               └── favorite.routes.js
│
└── frontend/
    ├── index.html
    ├── vite.config.js               # proxy /api → localhost:4000
    └── src/
        ├── main.jsx                 # bootstrap React + Router + Providers
        ├── App.jsx                  # definição das rotas
        ├── index.css                # tema dark completo
        ├── services/api.js          # único arquivo com chamadas HTTP
        ├── hooks/
        │   ├── useMovies.js         # padrão loading/error/data
        │   └── useFavorites.js
        ├── context/
        │   ├── FavoritesContext.jsx
        │   └── ToastContext.jsx
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Banner.jsx
        │   ├── MovieCard.jsx
        │   ├── Carousel.jsx
        │   ├── Skeleton.jsx
        │   └── TrailerModal.jsx
        └── pages/
            ├── Home.jsx
            ├── MovieDetails.jsx
            └── Favorites.jsx
```

---

## Como rodar

### Pré-requisitos

- [Node.js 18+](https://nodejs.org)
- Chave gratuita da TMDb: [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/pobreflix.git
cd pobreflix
```

### 2. Configure o backend

```bash
cd backend
npm install

# Windows
copy .env.example .env

# Linux / Mac
cp .env.example .env
```

Abra o `.env` e preencha sua chave:

```env
PORT=4000
TMDB_API_KEY=sua_chave_aqui
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_LANGUAGE=pt-BR
TMDB_IMAGE_BASE=https://image.tmdb.org/t/p
```

```bash
npm run dev   # inicia em http://localhost:4000
```

### 3. Configure o frontend (novo terminal)

```bash
cd frontend
npm install
npm run dev   # inicia em http://localhost:5173
```

> O Vite faz proxy automático de `/api` para `http://localhost:4000` — sem CORS.

---

## Endpoints da API

| Método   | Rota                      | Descrição                         |
| -------- | ------------------------- | --------------------------------- |
| `GET`    | `/health`                 | healthcheck                       |
| `GET`    | `/movies/search?q=`       | busca por termo                   |
| `GET`    | `/movies/trending`        | filmes em alta                    |
| `GET`    | `/movies/top-rated`       | filmes mais bem avaliados         |
| `GET`    | `/movies/:id`             | detalhes de um filme              |
| `GET`    | `/movies/:id/similar`     | filmes similares                  |
| `GET`    | `/movies/:id/trailer`     | trailer (YouTube key)             |
| `GET`    | `/movies/:id/credits`     | elenco e diretor                  |
| `GET`    | `/favorites`              | lista de favoritos                |
| `POST`   | `/favorites`              | adiciona favorito                 |
| `DELETE` | `/favorites/:id`          | remove favorito                   |

**Body do `POST /favorites`:**

```json
{
  "movieId": 27205,
  "title": "A Origem",
  "poster": "https://image.tmdb.org/t/p/w500/abc.jpg",
  "rating": 8.4,
  "releaseDate": "2010-07-15"
}
```

---

## Notas

- **Favoritos em memória:** o `FavoriteRepository` usa um `Map` — reiniciar o servidor zera a lista. Para persistência real, basta criar uma implementação com MongoDB ou SQLite que exponha os mesmos métodos (`findAll`, `findById`, `create`, `delete`).
- **Tradução da TMDb:** toda conversão de `snake_case` para `camelCase` e montagem das URLs de imagem acontece em `movie.dto.js` — se o contrato da TMDb mudar, só esse arquivo precisa ser atualizado.
- **Sem autenticação:** o projeto não implementa login. Cada sessão tem sua própria lista de favoritos em memória.

---

## Material de estudo

O repositório inclui documentos HTML sobre a arquitetura do projeto — abra direto no navegador, sem precisar de servidor:

- `estudo-basico.html` — explicação completa das camadas com fluxo, comparações e SOLID
- `estudo-basico-2.html` — versão condensada para consulta rápida
- `aulao.html` — aulão completo sobre como o projeto foi construído do zero

---

Feito com Node.js · Express · React · Vite · TMDb API
