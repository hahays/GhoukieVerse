import { ListBox } from "@/features/movies/components/ListBox";
import WatchedBox from "@/features/movies/components/WatchedBox/WatchedBox";
import React, { useState } from "react";

function Main({ movies, watched }) {
  return (
    <main className="main">
      <ListBox movies={movies} />
      <WatchedBox watched={watched} />
    </main>
  );
}

export default Main;
