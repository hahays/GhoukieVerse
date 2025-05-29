import { useState, useEffect } from 'react';
import {getMoviesByCategory, getTopRecentMovies} from '../lib/api';
import { Movie } from '../types';

export function useMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadMore = () => setPage(p => p + 1);
    const hasMore = movies.length < total;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                const data = await getTopRecentMovies(36, [2024, 2025], page);

                setMovies(prev => [...prev, ...data.docs]);
                setTotal(data.total);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [page]);

    return { movies, isLoading, error, loadMore, hasMore };
}