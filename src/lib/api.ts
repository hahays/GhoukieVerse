import {Movie} from "../types";
import {MovieDetails} from "../types/film";
import {fetchWithCache} from "./utils/utils";

export async function getTopMovies(
    limit = 36,
    page = 1,
    years: number[] = [2024, 2025]
): Promise<{ docs: Movie[]; total: number }> {
    try {
        const yearQuery = years.map(y => `year=${y}`).join('&');
        const url = `https://api.kinopoisk.dev/v1.4/movie?${yearQuery}&limit=${limit}&page=${page}&sortField=votes.kp&sortType=-1&notNullFields=poster.url&notNullFields=backdrop.url&type=movie`;

        console.log('API Request URL:', url);

        const data = await fetchWithCache(url);

        if (!data.docs || !Array.isArray(data.docs)) {
            throw new Error('Invalid API response format');
        }

        return {
            docs: data.docs.map((movie: any) => ({
                id: movie.id,
                name: movie.name,
                alternativeName: movie.alternativeName,
                year: movie.year,
                poster: movie.poster,
                backdrop: movie.backdrop,
                rating: movie.rating,
                genres: movie.genres,
                countries: movie.countries,
                movieLength: movie.movieLength,
            })),
            total: data.total
        };
    } catch (error) {
        console.error('Error in getTopMovies:', error);
        throw error;
    }
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
    const url = `https://api.kinopoisk.dev/v1.4/movie/${id}`;
    const data = await fetchWithCache(url);

    if (!data.poster?.url) {
        data.poster = { url: '/placeholder-poster.jpg' };
    }
    if (!data.backdrop?.url) {
        data.backdrop = { url: data.poster.url };
    }

    return {
        ...data,
        persons: data.persons || [],
        videos: data.videos || { trailers: [] },
    };
}