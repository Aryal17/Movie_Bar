import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMovieDetails,
  getMovieCredits,
  getMovieReviews,
  getMovieVideos,
  getSimilarMovies,
} from "../services/api";
import "../css/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [similar, setSimilar] = useState([]);
  

  useEffect(() => {
    getMovieDetails(id).then(setMovie);
    getMovieCredits(id).then(setCredits);
    getMovieReviews(id).then((data) => setReviews(data.results || []));

    getMovieVideos(id).then((data) => {
      const t = data.results.find(
        (v) => v.site === "YouTube" && v.type === "Trailer",
      );
      data.results.find((v) => v.site === "YouTube" && v.type === "Teaser");
      setTrailer(t || null);
    });

    getSimilarMovies(id).then((data) => {
      setSimilar(data?.results || []);
    });
  }, [id]);

  if (!movie) return <p className="loading">Loading...</p>;

  return (
    <div className="movie-details">
      {/* HERO */}
      <div
        className="movie-hero"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />

          <div className="info-box">
            <h1>{movie.title}</h1>
            <div className="meta">
              <span>⭐ {movie.vote_average}</span>
              <span>{movie.release_date}</span>
              <span>{movie.runtime} min</span>
            </div>
            {trailer && (
              <div className="action-row">
                <button
                  className="trailer-btn"
                  onClick={() => setShowTrailer(true)}
                >
                  ▶ Play Trailer
                </button>
              </div>
            )}

            <p className="overview">{movie.overview}</p>
          </div>
        </div>
      </div>

      {/* CAST */}
      <div className="content">
        <h2>Cast</h2>

        <div className="cast-grid">
          {credits?.cast?.slice(0, 10).map((actor) => (
            <div key={actor.id} className="cast-card">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "/no-image.png"
                }
                alt={actor.name}
              />
              <p>{actor.name}</p>
              <span>{actor.character}</span>
            </div>
          ))}
        </div>

        {/* REVIEWS */}
        <h2>Reviews</h2>

        <div className="reviews">
          {reviews.length === 0 && <p>No reviews found.</p>}

          {reviews.map((r) => (
            <div key={r.id} className="review-card">
              <h4>{r.author}</h4>
              <p>{r.content.slice(0, 300)}...</p>
            </div>
          ))}
        </div>

        {/*Similar Movies*/}
        <h2 className="section-title">Similar Movies</h2>

        <div className="similar-grid">
          {(similar || []).slice(0, 10).map((movie) => (
            <div key={movie.id} className="similar-card">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : "/no-image.png"
                }
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))}
          {Array.isArray(similar) &&
            similar.slice(0, 10).map((movie) => (
              <div key={movie.id} className="similar-card">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : "/no-image.png"
                  }
                  alt={movie.title}
                />
                <p>{movie.title}</p>
              </div>
            ))}
        </div>

        {/* TRAILER */}
        {showTrailer && trailer && (
          <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
            <div
              className="trailer-content"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                width="100%"
                height="500"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                allowFullScreen
              />
              <button
                className="close-btn"
                onClick={() => setShowTrailer(false)}
              >
                ✖
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
