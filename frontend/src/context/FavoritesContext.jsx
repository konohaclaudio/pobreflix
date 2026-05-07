import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as api from '../services/api.js';
import { useToast } from './ToastContext.jsx';

const FavoritesContext = createContext(null);

const LS_KEY = 'pobreflix_favorites';

function loadFromLS() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; }
}
function saveToLS(list) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(list)); } catch {}
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFromLS);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const list = await api.fetchFavorites();
      setFavorites(list);
      saveToLS(list);
    } catch {
      // backend offline → usa cache do localStorage silenciosamente
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const isFavorite = useCallback(
    (movieId) => favorites.some((f) => f.movieId === Number(movieId)),
    [favorites],
  );

  const add = useCallback(async (movie) => {
    try {
      const created = await api.addFavorite(movie);
      setFavorites((prev) => { const next = [created, ...prev]; saveToLS(next); return next; });
      toast.show(`"${movie.title}" adicionado aos favoritos!`, 'success');
    } catch (err) {
      toast.show('Erro ao adicionar favorito.', 'error');
    }
  }, [toast]);

  const remove = useCallback(async (movieId) => {
    const fav = favorites.find((f) => f.movieId === Number(movieId));
    try {
      await api.removeFavorite(movieId);
      setFavorites((prev) => { const next = prev.filter((f) => f.movieId !== Number(movieId)); saveToLS(next); return next; });
      if (fav) toast.show(`"${fav.title}" removido dos favoritos.`, 'info');
    } catch {
      toast.show('Erro ao remover favorito.', 'error');
    }
  }, [favorites, toast]);

  const toggle = useCallback(async (movie) => {
    if (isFavorite(movie.id)) await remove(movie.id);
    else await add(movie);
  }, [add, remove, isFavorite]);

  const value = useMemo(
    () => ({ favorites, loading, isFavorite, toggle, add, remove, refresh }),
    [favorites, loading, isFavorite, toggle, add, remove, refresh],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites deve ser usado dentro de <FavoritesProvider>.');
  return ctx;
}
