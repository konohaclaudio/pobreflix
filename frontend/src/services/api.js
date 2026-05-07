import axios from 'axios';

const api = axios.create({ baseURL: '/api', timeout: 15000 });

// -------- Movies --------
export async function searchMovies(query) {
  const { data } = await api.get('/movies/search', { params: { q: query } });
  return data.results;
}
export async function fetchTrending() {
  const { data } = await api.get('/movies/trending');
  return data.results;
}
export async function fetchTopRated() {
  const { data } = await api.get('/movies/top-rated');
  return data.results;
}
export async function fetchMovieById(id) {
  const { data } = await api.get(`/movies/${id}`);
  return data;
}
export async function fetchTrailer(id) {
  const { data } = await api.get(`/movies/${id}/trailer`);
  return data.trailer;
}
export async function fetchSimilar(id) {
  const { data } = await api.get(`/movies/${id}/similar`);
  return data.results;
}
export async function fetchCredits(id) {
  const { data } = await api.get(`/movies/${id}/credits`);
  return data;
}

// -------- Favorites --------
export async function fetchFavorites() {
  const { data } = await api.get('/favorites');
  return data.results;
}
export async function addFavorite(movie) {
  const { data } = await api.post('/favorites', {
    movieId: movie.id,
    title: movie.title,
    poster: movie.poster,
    rating: movie.rating,
    releaseDate: movie.releaseDate,
  });
  return data;
}
export async function removeFavorite(movieId) {
  await api.delete(`/favorites/${movieId}`);
}

export default api;
