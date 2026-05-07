import { useRef } from 'react';
import MovieCard from './MovieCard.jsx';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

export default function Carousel({ title, movies = [] }) {
  const trackRef = useRef(null);
  const revealRef = useScrollReveal();

  if (!movies.length) return null;

  function scroll(dir) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 600, behavior: 'smooth' });
  }

  return (
    <section className="carousel reveal" ref={revealRef}>
      <div className="carousel__header">
        <h2 className="carousel__title">{title}</h2>
        <div className="carousel__arrows">
          <button className="carousel__arrow" onClick={() => scroll(-1)} aria-label="Anterior">‹</button>
          <button className="carousel__arrow" onClick={() => scroll(1)} aria-label="Próximo">›</button>
        </div>
      </div>
      <div className="carousel__track" ref={trackRef}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
