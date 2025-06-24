import Link from "next/link";
import { Movie } from "../../../types";
import { useFavorites } from "../../../hooks/useFavorites";
import {MovieCard} from "../../cards/MovieCard/MovieCard";
import {GameCard} from "../../cards/GameCard/GameCard";
import {AnimeCard} from "../../cards/AnimeCard/AnimeCard";
import {useWatched} from "../../../hooks/useWatched";
import React from "react";

interface MediaGridProps {
    movies?: Movie[];
    mediaType: 'films' | 'games' | 'anime';
    isLoading?: boolean;
    error?: string | null;
    watchedMovies?: Set<number>;
}

export function MediaGrid({ movies, mediaType, isLoading, error }: MediaGridProps) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
    const { isWatched, markAsWatched } = useWatched();

    const handleFavoriteClick = (e: React.MouseEvent, movie: Movie) => {
        e.preventDefault();
        e.stopPropagation();
        const button = e.currentTarget;
        button.classList.add('animate-pulse');
        setTimeout(() => button.classList.remove('animate-pulse'), 300);
        if (isFavorite(movie.id, mediaType)) {
            removeFromFavorites(movie.id, mediaType);
        } else {
            addToFavorites({
                id: movie.id,
                name: movie.name,
                poster: movie.poster,
                year: movie.year,
                rating: movie.rating
            }, mediaType);
        }
    };

    const handleCardClick = (id: number) => {
        markAsWatched(id, mediaType);
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-10">
                {[...Array(12)].map((_, index) => (
                    <div key={index} className="bg-ghoukie-gray rounded-lg overflow-hidden animate-pulse aspect-[2/3]">
                        <div className="w-full h-full bg-ghoukie-dark-gray"/>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 p-4">Error: {error}</div>;
    }

    if (!movies || movies.length === 0) {
        return <div className="text-ghoukie-light-gray p-4">Ничего не найдено</div>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mt-8">
            {movies.map((movie) => (
                <Link
                    key={movie.id}
                    href={`/${mediaType}/${movie.id}`}
                    className="relative group"
                    passHref
                    onClick={() => handleCardClick(movie.id)}
                >
                    {mediaType === 'films' && <MovieCard movie={movie} isWatched={isWatched(movie.id, mediaType)} />}
                    {mediaType === 'games' && <GameCard game={movie} isWatched={isWatched(movie.id, mediaType)} />}
                    {mediaType === 'anime' && <AnimeCard anime={movie} isWatched={isWatched(movie.id, mediaType)} />}
                </Link>
            ))}
        </div>
    );
}