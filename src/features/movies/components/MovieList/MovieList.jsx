import React, { useState } from "react";
import Movie from "../Movie/Movie";

function MovieList({ movies }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && (
        <ul className="list">
          {movies?.map((movie) => (
            <Movie movie={movie} key={movie.imdbID} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieList;
