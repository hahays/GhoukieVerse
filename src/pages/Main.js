import { MovieList } from "@/features/movies/components/MovieList";
import WatchedBox from "@/features/movies/components/WatchedBox/WatchedBox";
import React, { useState } from "react";

function Main({ movies, watched }) {
  return (
    <main className="main">
      <MovieList movies={movies} />
      <WatchedBox watched={watched} />
    </main>
  );
}

export default Main;
