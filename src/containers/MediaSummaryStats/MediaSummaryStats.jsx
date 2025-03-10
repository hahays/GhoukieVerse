import { calculateMovieAverages } from "@/lib/utils";
import React from "react";

function MediaSummaryStats({ watched }) {
  const { avgImdbRating, avgUserRating, avgRuntime } = calculateMovieAverages(
    watched || []
  );
  return (
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
  );
}

export default MediaSummaryStats;
