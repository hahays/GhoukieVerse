import React, { useState } from "react";
import Movie from "../Movie/Movie";

function MovieList({ movies, onSelectMovie, onCloseMovie }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && (
        <ul className="list">
          {movies?.map((movie) => (
            <Movie
              onCloseMovie={onCloseMovie}
              movie={movie}
              key={movie.imdbID}
              onSelectMovie={onSelectMovie}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieList;
