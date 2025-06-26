import {MovieDetails} from "../../types/film";

export async function getMovieDetailsServer(id: string): Promise<MovieDetails> {
    const url = `https://api.kinopoisk.dev/v1.4/movie/${id}`;

    const response = await fetch(url, {
        headers: {
            "X-API-KEY": process.env.NEXT_PUBLIC_KINO_API_KEY!,
            "Content-Type": "application/json",
        },
        next: { revalidate: 3600 }
    });

    if (!response.ok) {
        throw new Error(`Kinopoisk API error: ${response.status}`);
    }

    const data = await response.json();


    if (!data.poster?.url) {
        data.poster = { url: '/placeholder-poster.jpg' };
    }

    return {
        ...data,
        persons: data.persons || [],
        videos: data.videos || { trailers: [] },
    };
}