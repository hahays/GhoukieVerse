import { useEffect, useRef, useState } from 'react';
import { getTopMovies } from '../lib/api';
import { Movie } from '../types';

export function useMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const cachedData = useRef<{ movies: Movie[]; total: number } | null>(null);

    const loadMore = () => {
        if (!isLoading && movies.length < total) {
            setPage(prev => prev + 1);
        }
    };

    const hasMore = movies.length < total;

    useEffect(() => {
        let isMounted = true; // Флаг для избежания утечек памяти

        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                setError(null);

                console.log('Fetching movies, page:', page); // Логирование

                const data = await getTopMovies(36, page, [2024, 2025]);
                console.log('Received data:', data); // Логирование

                if (!isMounted) return;

                if (page === 1) {
                    cachedData.current = {
                        movies: data.docs,
                        total: data.total
                    };
                }

                setMovies(prev =>
                    page === 1 ? data.docs : [...prev, ...data.docs]
                );
                setTotal(data.total);
            } catch (err) {
                if (!isMounted) return;

                const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                console.error('Error fetching movies:', errorMessage); // Логирование
                setError(errorMessage);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchMovies();

        return () => {
            isMounted = false; // Очистка при размонтировании
        };
    }, [page]);

    return { movies, isLoading, error, loadMore, hasMore };
}