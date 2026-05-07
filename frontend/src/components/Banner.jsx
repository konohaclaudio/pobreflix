import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites.js';

const INTERVAL = 9000;

export default function Banner({ movies = [] }) {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const { isFavorite, toggle } = useFavorites();

  useEffect(() => {
    if (movies.length <= 1) return;
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % movies.length);
        setFading(false);
      }, 500);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [movies.length]);

  const movie = movies[index];
  if (!movie) return null;

  const bg = movie.backdrop || movie.poster;
  const favorited = isFavorite(movie.id);

  return (
    <section
      className={`banner${fading ? ' banner--fading' : ''}`}
      style={{ backgroundImage: bg ? `url(${bg})` : 'none' }}
    >
      <div className="banner__indicators">
        {movies.slice(0, 6).map((_, i) => (
          <button
            key={i}
            className={`banner__dot${i === index ? ' banner__dot--active' : ''}`}
            onClick={() => { setFading(true); setTimeout(() => { setIndex(i); setFading(false); }, 400); }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="banner__content">
        <h1 className="banner__title">{movie.title}</h1>
        {movie.overview && <p className="banner__overview">{movie.overview}</p>}

        <div className="banner__actions">
          <Link to={`/movie/${movie.id}`} className="btn btn--primary">
            ▶ Detalhes
          </Link>
          <button
            type="button"
            className={`btn ${favorited ? 'btn--accent' : 'btn--ghost'} btn--fav`}
            onClick={() => toggle(movie)}
          >
            <span className={`fav-icon${favorited ? ' fav-icon--active' : ''}`}>
              {favorited ? '♥' : '♡'}
            </span>
            {favorited ? 'Favoritado' : 'Minha lista'}
          </button>
        </div>
      </div>
    </section>
  );
}
