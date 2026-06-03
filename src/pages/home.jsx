import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";
import { useNavigate, useLocation } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  // LOAD POPULAR MOVIES ON FIRST LOAD
  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    try {
      setLoading(true);
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
      setError(null);
    } catch (err) {
      setError("Failed to load movies...");
    } finally {
      setLoading(false);
    }
  };

  

  // LIVE SUGGESTIONS
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const delay = setTimeout(() => {
      searchMovies(query).then((data) => {
        setSuggestions(data?.slice(0, 6) || []);
      });
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  const handleSearch = async (e) => {
  e.preventDefault();

  if (!query.trim()) {
    loadPopularMovies();   // 🔥 THIS IS IMPORTANT
    return;
  }

  setLoading(true);

  try {
    const searchResults = await searchMovies(query);
    setMovies(searchResults);
    setSuggestions([]);
    setError(null);
  } catch (err) {
    setError("Failed to search movies...");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (query === "") {
    loadPopularMovies();
  }
}, [query]);
  return (
    <div className="home">

      <form onSubmit={handleSearch} className="search-form">
        <div className="search-wrapper">

          <input
            className="search-input"
            type="text"
            value={query}
            placeholder="Search movies..."
            onChange={(e) => setQuery(e.target.value)}
          />

          <button type="submit" className="search-button">
            Search
          </button>

          {Array.isArray(suggestions) && suggestions.length > 0 && (
            <div className="suggest-box">
              {suggestions.map((movie) => (
                <div
                  key={movie.id}
                  className="suggest-item"
                  onClick={() => {
                    setQuery(movie.title);
                    setSuggestions([]);
                    navigate(`/movie/${movie.id}`);
                  }}
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                        : "/no-image.png"
                    }
                    alt={movie.title}
                  />
                  <span>{movie.title}</span>
                </div>
              ))}
            </div>
          )}

        </div>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}

    </div>
  );
}

export default Home;