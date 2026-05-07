import { useEffect, useState } from 'react';

/**
 * hooks/useMovies.js
 * -----------------------------------------------------------------------------
 * Hook genérico para listas de filmes. Recebe um "fetcher" (função async que
 * devolve um array) e cuida do ciclo de loading/erro/dados. Reutilizado pela
 * Home (trending, top-rated) e pela tela de busca.
 */
export function useMovies(fetcher, deps = []) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetcher()
      .then((result) => {
        if (!cancelled) setData(result || []);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.response?.data?.message || 'Erro ao carregar filmes.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
