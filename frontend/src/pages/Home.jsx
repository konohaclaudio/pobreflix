import { useSearchParams } from 'react-router-dom';

import Banner from '../components/Banner.jsx';
import Carousel from '../components/Carousel.jsx';
import MovieCard from '../components/MovieCard.jsx';
import { BannerSkeleton, CarouselSkeleton } from '../components/Skeleton.jsx';
import { useMovies } from '../hooks/useMovies.js';
import { fetchTopRated, fetchTrending, searchMovies } from '../services/api.js';

export default function Home() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return query.trim() ? <SearchView query={query} /> : <BrowseView />;
}

function BrowseView() {
  const trending = useMovies(fetchTrending, []);
  const topRated = useMovies(fetchTopRated, []);

  const isLoading = trending.loading && topRated.loading;

  if (isLoading) {
    return (
      <>
        <BannerSkeleton />
        <CarouselSkeleton title="Em alta" count={7} />
        <CarouselSkeleton title="Mais bem avaliados" count={7} />
      </>
    );
  }

  if (trending.error && topRated.error) {
    return (
      <div className="state">
        <h2 className="state__title">Não foi possível carregar o catálogo.</h2>
        <p>Verifique se o backend está rodando e a chave da TMDb está configurada.</p>
      </div>
    );
  }

  return (
    <>
      <Banner movies={trending.data.slice(0, 6)} />
      <Carousel title="🔥 Em alta esta semana" movies={trending.data.slice(6)} />
      <Carousel title="⭐ Mais bem avaliados" movies={topRated.data} />
    </>
  );
}

function SearchView({ query }) {
  const { data, loading, error } = useMovies(() => searchMovies(query), [query]);

  return (
    <section className="search-results">
      <h1 className="search-results__title">Resultados para "{query}"</h1>

      {loading && (
        <div className="search-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="movie-card movie-card--skeleton">
              <div className="skeleton" style={{ height: 270, borderRadius: 0 }} />
              <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div className="skeleton" style={{ height: 14, width: '80%' }} />
                <div className="skeleton" style={{ height: 12, width: '50%' }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <p className="state">{error}</p>}

      {!loading && !error && data.length === 0 && (
        <p className="state">Nenhum filme encontrado para "{query}".</p>
      )}

      {!loading && !error && (
        <div className="search-grid">
          {data.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      )}
    </section>
  );
}
