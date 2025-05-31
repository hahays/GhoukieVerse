import {useEffect, useRef, useState} from 'react';
import {getTopMovies} from '../lib/api';
import {Movie} from '../types';

export function useMovies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const cachedData = useRef<{ movies: Movie[]; total: number } | null>(null);

    const loadMore = () => setPage(p => p + 1);
    const hasMore = movies.length < total;

    useEffect(() => {
        const fetchMovies = async () => {

            if (cachedData.current && page === 1) {
                setMovies(cachedData.current.movies);
                setTotal(cachedData.current.total);
                return;
            }

            try {
                setIsLoading(true);
                const data = await getTopMovies(36, page, [2024, 2025]);

                if (page === 1) {
                    cachedData.current = {
                        movies: data.docs,
                        total: data.total
                    };
                }

                setMovies(prev => page === 1 ? data.docs : [...prev, ...data.docs]);
                setTotal(data.total);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [page]);

    return {movies, isLoading, error, loadMore, hasMore};
}