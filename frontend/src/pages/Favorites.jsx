import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites.js';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

export default function Favorites() {
  const { favorites, loading, remove } = useFavorites();
  const revealRef = useScrollReveal();

  if (loading) {
    return (
      <section className="search-results">
        <h1 className="search-results__title">Meus favoritos</h1>
        <div className="search-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="movie-card movie-card--skeleton">
              <div className="skeleton" style={{ height: 270, borderRadius: 0 }} />
              <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div className="skeleton" style={{ height: 14, width: '80%' }} />
                <div className="skeleton" style={{ height: 12, width: '50%' }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="state">
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎬</div>
        <h2 className="state__title">Sua lista está vazia</h2>
        <p>Explore o catálogo e adicione filmes que você quer assistir.</p>
        <Link to="/" className="btn btn--accent" style={{ marginTop: 24, display: 'inline-block' }}>
          Explorar filmes
        </Link>
      </div>
    );
  }

  return (
    <section className="search-results reveal" ref={revealRef}>
      <h1 className="search-results__title">
        Meus favoritos <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.6em' }}>({favorites.length})</span>
      </h1>
      <div className="search-grid">
        {favorites.map((fav) => {
          const year = fav.releaseDate ? new Date(fav.releaseDate).getFullYear() : '—';
          return (
            <div key={fav.movieId} className="movie-card fav-card">
              <Link to={`/movie/${fav.movieId}`} className="movie-card__link">
                {fav.poster ? (
                  <img className="movie-card__poster" src={fav.poster} alt={fav.title} loading="lazy" />
                ) : (
                  <div className="movie-card__poster movie-card__poster--placeholder">Sem imagem</div>
                )}
              </Link>
              <div className="movie-card__body">
                <p className="movie-card__title" title={fav.title}>{fav.title}</p>
                <p className="movie-card__meta">
                  <span>{year}</span>
                  {fav.rating != null && (
                    <span className={`movie-card__rating movie-card__rating--${ratingClass(fav.rating)}`}>
                      ★ {fav.rating}
                    </span>
                  )}
                </p>
                <button
                  type="button"
                  className="btn btn--remove"
                  onClick={() => remove(fav.movieId)}
                >
                  ✕ Remover
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ratingClass(r) {
  if (r >= 7.5) return 'high';
  if (r >= 5) return 'mid';
  return 'low';
}
