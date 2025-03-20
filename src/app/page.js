"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { tempMovieData, tempWatchedData } from "@/mocks/movies";
import NavBar from "@/containers/NavBar/NavBar";
import Main from "@/pages/Main";
import { MovieList } from "@/features/movies/components/MovieList";

import Box from "@/components/ui/Box/Box";
import { MediaSummaryStats } from "@/containers/MediaSummaryStats";
import { MediaDetailsList } from "@/containers/MediaDetailsList";
import { Loader } from "@/containers/Loader";
import { ErrorMessage } from "@/containers/ErrorMessage";

const KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const QUERY = "gladiator";

  // fetch(
  //   `http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  // );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        if (!response.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await response.json();

        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
      } catch (error) {
        console.error("Ошибка:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchData();
  }, [query]);

  // function Loader() {
  //   return <p className="loader"> LOADING . . . </p>;
  // }

  return (
    <>
      <NavBar movies={movies} query={query} setQuery={setQuery} />
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          <MediaSummaryStats watched={watched} />
          <MediaDetailsList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
