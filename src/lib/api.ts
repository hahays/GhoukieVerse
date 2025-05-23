import {Movie} from "../types";


const KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getMoviesByCategory(category: string): Promise<Movie[]> {
    const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${category}`);
    const data = await res.json();
    return data.Search || [];
}