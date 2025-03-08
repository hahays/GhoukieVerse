"use client";
import Image from "next/image";
import { useState } from "react";

import { tempMovieData, tempWatchedData } from "@/mocks/movies";
import NavBar from "@/containers/NavBar/NavBar";
import Main from "@/pages/Main";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar movies={movies} query={query} />
      <Main movies={movies} watched={watched} />
    </>
  );
}
