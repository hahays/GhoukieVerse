import { useEffect, useRef, useState } from 'react';
import { getTopMovies } from '../lib/api';
import { Movie } from '../types';

export function useMovies(initialFilters: { year?: { from?: string; to?: string } } = {}) {
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
        // Сбрасываем данные при изменении фильтров
        setPage(1);
        setMovies([]);
        cachedData.current = null;
    }, [initialFilters.year]);

    useEffect(() => {
        let isMounted = true;

        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const yearParams = initialFilters.year?.from || initialFilters.year?.to
                    ? {
                        from: initialFilters.year.from ? parseInt(initialFilters.year.from) : undefined,
                        to: initialFilters.year.to ? parseInt(initialFilters.year.to) : undefined
                    }
                    : [2024, 2025];

                console.log('Fetching with params:', { page, yearParams }); // Логирование

                const data = await getTopMovies(36, page, yearParams);

                if (!isMounted) return;

                console.log('Received data:', data); // Логирование

                if (page === 1) {
                    cachedData.current = {
                        movies: data.docs,
                        total: data.total
                    };
                    setMovies(data.docs);
                } else {
                    setMovies(prev => [...prev, ...data.docs]);
                }
                setTotal(data.total);

            } catch (err) {
                if (!isMounted) return;
                const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                console.error('Error fetching movies:', errorMessage);
                setError(errorMessage);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchMovies();

        return () => {
            isMounted = false;
        };
    }, [page, initialFilters.year]);

    return { movies, isLoading, error, loadMore, hasMore };
}