import { useState, useEffect } from 'react';
import { getMoviesByCategory } from '../lib/api';
import { Movie } from '../types';

export function useMovies(category: string) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0); // Изменили с totalResults на total
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadMore = () => setPage(p => p + 1);
    const hasMore = movies.length < total; // Проверяем по total

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                const data = await getMoviesByCategory(category, page);
                console.log('API Response:', data);

                setMovies(prev => [...prev, ...data.docs]);
                setTotal(data.total);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [category, page]);

    return { movies, isLoading, error, loadMore, hasMore };
}