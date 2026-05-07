import { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
import Favorites from './pages/Favorites.jsx';

export default function App() {
  const location = useLocation();
  const mainRef = useRef(null);

  // Fade de página ao trocar de rota
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    el.classList.remove('page-enter');
    void el.offsetWidth; // reflow para reiniciar animação
    el.classList.add('page-enter');
  }, [location.pathname]);

  return (
    <div className="app">
      <Navbar />
      <main className="app-main page-enter" ref={mainRef}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </div>
  );
}
