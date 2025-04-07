"use client";

import { useEffect, useState } from "react";


import { Movie } from "../types";
import {OMDBResponse} from "../types/film";
import NavBar from "../containers/NavBar/NavBar";
import Main from "../components/ui/Main/Main";
import {Box} from "../components/ui/Box";
import {Loader} from "../components/ui/Loader";
import {FilmList} from "../components/films/FilmList";
import {ErrorMessage} from "../containers/ErrorMessage";
import {MediaDetailsCard} from "../containers/MediaDetailsCard";
import {MediaSummaryStats} from "../containers/MediaSummaryStats";
import {MediaDetailsList} from "../containers/MediaDetailsList";

const KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Home() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [watched, setWatched] = useState<Movie[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleSelectMovie = (id: string) => {
        setSelectedId((prevId) => (id === prevId ? null : id));
    };

    const handleCloseMovie = () => {
        setSelectedId(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError("");

                const response = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
                );

                if (!response.ok) {
                    throw new Error("Something went wrong with fetching movies");
                }

                const data: OMDBResponse = await response.json();

                if (data.Response === "False") {
                    throw new Error(data.Error || "Movies not found");
                }

                setMovies(data.Search || []);
            } catch (err) {
                const error = err as Error;
                console.error("Error:", error);
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

    return (
        <>
            <NavBar
                movies={movies}
                query={query}
                setQuery={setQuery}
            />

            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {!isLoading && !error && (
                        <FilmList
                            movies={movies}
                            onSelectMovie={handleSelectMovie}
                        />
                    )}
                    {error && <ErrorMessage message={error} />}
                </Box>

                <Box>
                    {selectedId ? (
                        <MediaDetailsCard
                            selectedId={selectedId}
                            onClose={handleCloseMovie}
                        />
                    ) : (
                        <>
                            <MediaSummaryStats watched={watched} />
                            <MediaDetailsList watched={watched} />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}