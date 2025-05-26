import { useState, useEffect } from 'react';
import { getMoviesByCategory } from '../lib/api';
import { Movie } from '../types';

export function useMovies(category: string) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadMore = () => setPage(p => p + 1);
    const hasMore = movies.length < totalResults;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                const { movies: newMovies, totalResults } = await getMoviesByCategory(category, page);

                setMovies(prev => [...prev, ...newMovies]);
                setTotalResults(totalResults);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [category, page]);

    return { movies, isLoading, error, loadMore, hasMore };
}