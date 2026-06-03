const API_KEY = "9ab968edf62e3a055b4862a50474379d";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};

export const getMovieDetails = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data;
};



export const getMovieCredits = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
  return res.json();
};

export const getMovieReviews = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`);
  return res.json();
};


export const getMovieVideos = async (id) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
  );

  return res.json();
};


export const getSimilarMovies = async (id) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.results;
};