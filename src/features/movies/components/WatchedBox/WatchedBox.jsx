import React, { useState } from "react";
import { calculateMovieAverages } from "@/lib/utils";

function WatchedBox({ watched }) {
  const [isOpen, setIsOpen] = useState(true);
  const { avgImdbRating, avgUserRating, avgRuntime } = calculateMovieAverages(
    watched || []
  );
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && (
        <>
          <div className="summary">
            <h2>Movies you watched</h2>
            <div>
              <p>
                <span>#️⃣</span>
                <span>{watched.length} movies</span>
              </p>
              <p>
                <span>⭐IMDb Rating</span>
                <span>{avgImdbRating}</span>
              </p>
              <p>
                <span>🌟Your Rating</span>
                <span>{avgUserRating}</span>
              </p>
              <p>
                <span>⏳Average Runtime</span>
                <span>{avgRuntime} min</span>
              </p>
            </div>
          </div>

          <ul className="list">
            {watched.map((movie) => (
              <li key={movie.imdbID}>
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                <h3>{movie.Title}</h3>
                <div>
                  <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default WatchedBox;
