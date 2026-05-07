import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useMovies } from '../hooks/useMovies.js';
import { useFavorites } from '../hooks/useFavorites.js';
import { fetchMovieById, fetchTrailer, fetchSimilar, fetchCredits } from '../services/api.js';
import Carousel from '../components/Carousel.jsx';
import TrailerModal from '../components/TrailerModal.jsx';
import { Skeleton } from '../components/Skeleton.jsx';

export default function MovieDetails() {
  const { id } = useParams();
  const [showTrailer, setShowTrailer] = useState(false);

  const { data: movieArr, loading, error } = useMovies(
    async () => [await fetchMovieById(id)], [id],
  );
  const { data: trailerData } = useMovies(() => fetchTrailer(id).then((t) => [t]), [id]);
  const { data: similar } = useMovies(() => fetchSimilar(id), [id]);
  const { data: creditsData } = useMovies(() => fetchCredits(id).then((c) => [c]), [id]);

  const { isFavorite, toggle } = useFavorites();

  if (loading) return <DetailsSkeleton />;
  if (error || !movieArr[0]) {
    return (
      <div className="state">
        <h2 className="state__title">Filme não encontrado</h2>
        <p>{error || 'Tente outro título.'}</p>
        <Link to="/" className="btn btn--ghost" style={{ marginTop: 16, display: 'inline-block' }}>← Voltar</Link>
      </div>
    );
  }

  const movie = movieArr[0];
  const trailer = trailerData?.[0] || null;
  const credits = creditsData?.[0] || null;
  const favorited = isFavorite(movie.id);
  const year = movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : '—';

  return (
    <article className="details">
      <div
        className="details__hero"
        style={{ backgroundImage: movie.backdrop ? `url(${movie.backdrop})` : 'none' }}
      />

      <div className="details__body">
        {movie.poster && (
          <div className="details__poster-wrap">
            <img className="details__poster" src={movie.poster} alt={movie.title} />
            {trailer && (
              <button className="details__trailer-thumb" onClick={() => setShowTrailer(true)}>
                <span className="play-icon">▶</span>
                <span>Ver Trailer</span>
              </button>
            )}
          </div>
        )}

        <div className="details__info">
          <h1 className="details__title">{movie.title}</h1>

          {movie.originalTitle && movie.originalTitle !== movie.title && (
            <p className="details__original-title">{movie.originalTitle}</p>
          )}

          <div className="details__meta">
            <span className="details__meta-item">{year}</span>
            {movie.runtime && <span className="details__meta-item">{movie.runtime} min</span>}
            {movie.rating != null && (
              <span className={`details__meta-item details__rating details__rating--${ratingClass(movie.rating)}`}>
                ★ {movie.rating}
              </span>
            )}
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div className="details__genres">
              {movie.genres.map((g) => <span key={g} className="details__genre">{g}</span>)}
            </div>
          )}

          <p className="details__overview">{movie.overview || 'Sem sinopse disponível.'}</p>

          {credits?.director && (
            <p className="details__director">
              <span>Diretor:</span> {credits.director}
            </p>
          )}

          <div className="details__actions">
            <button
              type="button"
              className={`btn ${favorited ? 'btn--accent' : 'btn--ghost'} btn--fav`}
              onClick={() => toggle(movie)}
            >
              <span className={`fav-icon${favorited ? ' fav-icon--active' : ''}`}>
                {favorited ? '♥' : '♡'}
              </span>
              {favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            </button>

            {trailer && (
              <button className="btn btn--primary" onClick={() => setShowTrailer(true)}>
                ▶ Trailer
              </button>
            )}
          </div>
        </div>
      </div>

      {credits?.cast && credits.cast.length > 0 && (
        <section className="cast-section">
          <h2 className="cast-section__title">Elenco principal</h2>
          <div className="cast-grid">
            {credits.cast.map((person) => (
              <div key={person.id} className="cast-card">
                {person.photo ? (
                  <img className="cast-card__photo" src={person.photo} alt={person.name} loading="lazy" />
                ) : (
                  <div className="cast-card__photo cast-card__photo--placeholder">👤</div>
                )}
                <p className="cast-card__name">{person.name}</p>
                <p className="cast-card__character">{person.character}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {similar && similar.length > 0 && (
        <Carousel title="Filmes similares" movies={similar} />
      )}

      {showTrailer && trailer && (
        <TrailerModal youtubeKey={trailer.key} onClose={() => setShowTrailer(false)} />
      )}
    </article>
  );
}

function ratingClass(r) {
  if (r >= 7.5) return 'high';
  if (r >= 5) return 'mid';
  return 'low';
}

function DetailsSkeleton() {
  return (
    <article className="details">
      <div className="details__hero" style={{ background: '#18181f' }} />
      <div className="details__body">
        <Skeleton width="240px" height="360px" borderRadius="8px" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Skeleton height="42px" width="70%" />
          <Skeleton height="16px" width="40%" />
          <Skeleton height="14px" width="90%" />
          <Skeleton height="14px" width="80%" />
          <Skeleton height="14px" width="60%" />
        </div>
      </div>
    </article>
  );
}
