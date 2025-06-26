import { useState, useEffect } from 'react';
import {Movie, MovieFilterParams} from "../types/film";
import { movieApi } from "../features/movies/api/movieApi";
import {FilterOption} from "../components/ui/FilterPanel/types";

export const useMovieFilters = () => {
    const [filters, setFilters] = useState<MovieFilterParams>({});
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const applyFilters = async (newFilters: MovieFilterParams) => {
        try {
            setIsLoading(true);
            setError(null);
            setFilters(newFilters);
            setPage(1); // Сбрасываем страницу при новых фильтрах

            const result = await movieApi.getFilteredMovies({
                ...newFilters,
                limit: 36,
                page: 1
            });

            setMovies(result.docs);
            setTotal(result.total);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setIsLoading(false);
        }
    };

    const loadMore = async () => {
        if (isLoading || movies.length >= total) return;

        try {
            setIsLoading(true);
            const nextPage = page + 1;
            const result = await movieApi.getFilteredMovies({
                ...filters,
                limit: 36,
                page: nextPage
            });

            setMovies(prev => [...prev, ...result.docs]);
            setPage(nextPage);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setIsLoading(false);
        }
    };

    const [genres, setGenres] = useState<FilterOption[]>([]);
    const [countries, setCountries] = useState<FilterOption[]>([]);

    useEffect(() => {
        const loadFilterOptions = async () => {
            try {
                const [genresData, countriesData] = await Promise.all([
                    movieApi.getGenres(),
                    movieApi.getCountries()
                ]);

                // Преобразуем данные API в формат для Select компонента
                setGenres(genresData.map((g: any) => ({ value: g.name, label: g.name })));
                setCountries(countriesData.map((c: any) => ({ value: c.name, label: c.name })));
            } catch (err) {
                console.error('Failed to load filter options', err);
            }
        };

        loadFilterOptions();
    }, []);

    return {
        filters,
        movies,
        isLoading,
        error,
        applyFilters,
        loadMore,
        hasMore: movies.length < total,
        filterOptions: {
            genres,
            countries
        }
    };
};