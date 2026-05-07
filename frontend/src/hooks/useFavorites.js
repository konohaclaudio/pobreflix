/**
 * hooks/useFavorites.js
 * -----------------------------------------------------------------------------
 * Re-export para que componentes possam fazer `import { useFavorites } from
 * '../hooks/useFavorites'` mesmo que a implementação real esteja no Context.
 * Mantém a regra "componente importa do hooks/" sem duplicar lógica.
 */
export { useFavorites } from '../context/FavoritesContext.jsx';
