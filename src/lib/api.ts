import { Movie, MovieDetails } from "../types";

const KINO_API_KEY = process.env.NEXT_PUBLIC_KINO_API_KEY;
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 часа

interface CacheItem {
    data: any;
    timestamp: number;
}

const cache = new Map<string, CacheItem>();

async function fetchWithCache(url: string): Promise<any> {
    // Проверяем кеш в памяти
    const cached = cache.get(url);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
    }

    // Проверяем кеш в localStorage (сохраняется между перезагрузками)
    if (typeof window !== 'undefined') {
        const localStorageKey = `kp_cache_${btoa(url)}`;
        const cachedResponse = localStorage.getItem(localStorageKey);

        if (cachedResponse) {
            const { data, timestamp } = JSON.parse(cachedResponse);
            if (Date.now() - timestamp < CACHE_TTL) {
                // Сохраняем в memory cache для быстрого доступа
                cache.set(url, { data, timestamp });
                return data;
            }
        }
    }

    // Делаем новый запрос
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

    // Сохраняем в кеши
    const cacheItem = { data, timestamp: Date.now() };
    cache.set(url, cacheItem);

    if (typeof window !== 'undefined') {
        localStorage.setItem(`kp_cache_${btoa(url)}`, JSON.stringify(cacheItem));
    }

    return data;
}

export async function getTopMovies(
    limit = 36,
    page = 1,
    years: number[] = [2024, 2025]
): Promise<{ docs: Movie[]; total: number }> {
    const yearQuery = years.map(y => `year=${y}`).join('&');
    const url = `https://api.kinopoisk.dev/v1.4/movie?${yearQuery}&limit=${limit}&page=${page}&sortField=votes.kp&sortType=-1&notNullFields=poster.url&notNullFields=backdrop.url&type=movie`;

    const data = await fetchWithCache(url);

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
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
    const url = `https://api.kinopoisk.dev/v1.4/movie/${id}`;
    const data = await fetchWithCache(url);

    // Добавляем fallback для изображений
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