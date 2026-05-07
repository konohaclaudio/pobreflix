import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [term, setTerm] = useState(searchParams.get('q') || '');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setTerm(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const q = term.trim();
    navigate(q ? `/?q=${encodeURIComponent(q)}` : '/');
  }

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <Link to="/" className="navbar__brand">Pobreflix</Link>

      <nav className="navbar__nav">
        <NavLink to="/" end className={({ isActive }) => 'navbar__link' + (isActive ? ' navbar__link--active' : '')}>
          Início
        </NavLink>
        <NavLink to="/favorites" className={({ isActive }) => 'navbar__link' + (isActive ? ' navbar__link--active' : '')}>
          Favoritos
        </NavLink>

        <form className="navbar__search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Buscar filmes..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit" className="navbar__search-btn" aria-label="Buscar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
        </form>
      </nav>
    </header>
  );
}
