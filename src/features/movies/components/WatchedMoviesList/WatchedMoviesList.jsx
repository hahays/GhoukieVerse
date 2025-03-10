import React from "react";
import WatchedMovie from "../WatchedMovie/WatchedMovie";

function WatchedMoviesList({ watched }) {
  <ul className="list">
    {watched.map((movie) => (
      <WatchedMovie movie={movie} key={movie.imdbID} />
    ))}
  </ul>;
}

export default WatchedMoviesList;
