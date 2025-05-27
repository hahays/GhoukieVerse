import {Movie} from "../types";
import {MovieDetails} from "../types/film";


const KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getMoviesByCategory(
    category: string,
    page: number = 1
): Promise<{
    movies: Movie[];
    totalResults: number;
}> {
    const res = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&s=${encodeURIComponent(category)}&page=${page}`
    );
    const data = await res.json();

    if (data.Response === "False") {
        throw new Error(data.Error || "Failed to fetch movies");
    }

    return {
        movies: data.Search || [],
        totalResults: parseInt(data.totalResults) || 0
    };
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${id}&plot=full`);
    const data = await res.json();

    if (data.Response === "False") {
        throw new Error(data.Error || "Movie not found");
    }

    return data;
}