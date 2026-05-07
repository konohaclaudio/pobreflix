import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites.js';

export default function MovieCard({ movie }) {
  const [hovered, setHovered] = useState(false);
  const { isFavorite, toggle } = useFavorites();
  const favorited = isFavorite(movie.id);
  const year = movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : '—';

  async function handleFavorite(e) {
    e.preventDefault();
    e.stopPropagation();
    try { await toggle(movie); } catch {}
  }

  return (
    <div
      className={`movie-card${hovered ? ' movie-card--hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/movie/${movie.id}`} className="movie-card__link">
        {movie.poster ? (
          <img className="movie-card__poster" src={movie.poster} alt={movie.title} loading="lazy" />
        ) : (
          <div className="movie-card__poster movie-card__poster--placeholder">Sem imagem</div>
        )}

        <div className="movie-card__overlay">
          <p className="movie-card__overlay-title">{movie.title}</p>
          {movie.overview && (
            <p className="movie-card__overview">{movie.overview.slice(0, 100)}…</p>
          )}
          <div className="movie-card__overlay-meta">
            <span>{year}</span>
            {movie.rating != null && (
              <span className={`movie-card__rating movie-card__rating--${ratingClass(movie.rating)}`}>
                ★ {movie.rating}
              </span>
            )}
          </div>
          <button
            className={`movie-card__fav-btn${favorited ? ' movie-card__fav-btn--active' : ''}`}
            onClick={handleFavorite}
            aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            {favorited ? '♥' : '♡'}
          </button>
        </div>
      </Link>

      <div className="movie-card__body">
        <p className="movie-card__title" title={movie.title}>{movie.title}</p>
        <p className="movie-card__meta">
          <span>{year}</span>
          {movie.rating != null && (
            <span className={`movie-card__rating movie-card__rating--${ratingClass(movie.rating)}`}>
              ★ {movie.rating}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

function ratingClass(r) {
  if (r >= 7.5) return 'high';
  if (r >= 5) return 'mid';
  return 'low';
}
