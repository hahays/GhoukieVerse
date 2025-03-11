"use client";
import Image from "next/image";
import { useState } from "react";

import { tempMovieData, tempWatchedData } from "@/mocks/movies";
import NavBar from "@/containers/NavBar/NavBar";
import Main from "@/pages/Main";
import { MovieList } from "@/features/movies/components/MovieList";

import Box from "@/components/ui/Box/Box";
import { MediaSummaryStats } from "@/containers/MediaSummaryStats";
import { MediaDetailsList } from "@/containers/MediaDetailsList";
import { StarRating } from "@/components/ui/StarRating";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar movies={movies} query={query} />
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <MediaSummaryStats watched={watched} />
          <MediaDetailsList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
