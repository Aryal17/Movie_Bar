import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);
  const navigate = useNavigate();

  function onFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  function goToDetails() {
    navigate(`/movie/${movie.id}`);
  }

  return (
    <div className="movie-card" onClick={goToDetails}>
      
      <div className="movie-poster">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/no-image.png"
          }
          alt={movie.title}
        />

        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ♥
          </button>

          <div className="movie-rating">
            ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </div>

          <div className="movie-overview">
            {movie.overview
              ? movie.overview.slice(0, 90) + "..."
              : "No description available."}
          </div>
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>

    </div>
  );
}

export default MovieCard;