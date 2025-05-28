import {Movie} from "../types";
import {MovieDetails} from "../types/film";


const KINO_API_KEY = process.env.NEXT_PUBLIC_KINO_API_KEY;
const CACHE_TTL = 24 * 60 * 60 * 1000;


interface CacheItem {
    data: any;
    timestamp: number;
}
console.log('API_TOKEN:', KINO_API_KEY)
const cache = new Map<string, CacheItem>();

async function fetchWithCache(url: string): Promise<any> {

    const cached = cache.get(url);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
    }

    const response = await fetch(url, {
        headers: {
            "X-API-KEY": KINO_API_KEY!,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Kinopoisk API error: ${response.status}`);
    }

    const data = await response.json();


    cache.set(url, {
        data,
        timestamp: Date.now(),
    });

    return data;
}

export async function getMoviesByCategory(
    category: string,
    page = 1,
    limit = 36
): Promise<{ docs: Movie[]; total: number }> {
    const url = `https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=${limit}`;
    const data = await fetchWithCache(url);

    return {
        docs: data.docs.map((movie: any) => ({
            id: movie.id,
            name: movie.name,
            alternativeName: movie.alternativeName,
            year: movie.year,
            poster: movie.poster,
            rating: movie.rating,
            genres: movie.genres,
            countries: movie.countries,
            movieLength: movie.movieLength,
        })),
        total: data.total
    };
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
    const url = `https://api.kinopoisk.dev/v1.4/movie/${id}`;
    const data = await fetchWithCache(url);

    return {
        ...data,
        persons: data.persons || [],
        videos: data.videos || { trailers: [] },
    };
}