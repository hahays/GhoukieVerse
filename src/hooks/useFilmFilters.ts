'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../stores/hooks";
import {useGetTopMoviesQuery, useLazyGetTopMoviesQuery} from "../app/api/films/films.api";
import {FilmFilters} from "../types/film";
import {resetFilmFilters, setFilmFilter} from "../stores/slices/films/filmFilters.slice";
import {buildQuery} from "../lib/utils/buildQuery";


export function useFilmFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const filters = useAppSelector(state => state.filmFilters);

    const [fetchMovies, {data, isFetching}] = useLazyGetTopMoviesQuery();
    const {data: initialData} = useGetTopMoviesQuery(
        {limit: 36, page: 1, year: '2025-2025', sortField: 'year', sortType: '-1'},
        {skip: searchParams.size > 0}
    );

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const urlFilters: Partial<FilmFilters> = {};

        if (params.has('year')) {
            const [from, to] = params.get('year')!.split('-');
            urlFilters.year = {from: from || '', to: to || ''};
        }
        if (params.has('genres')) urlFilters.genres = params.get('genres')!.split(',');
        if (params.has('rating')) urlFilters.rating = params.get('rating')!;
        if (params.has('top250')) urlFilters.top250 = true;

        if (Object.keys(urlFilters).length) dispatch(setFilmFilter(urlFilters));
    }, [searchParams, dispatch]);

    const applyFilters = useCallback(async () => {
        const params = new URLSearchParams();

        if (filters.top250) params.set('top250', 'true');
        if (filters.year?.from || filters.year?.to) params.set('year', `${filters.year.from}-${filters.year.to}`);
        if (filters.genres?.length) params.set('genres', filters.genres.join(','));
        if (filters.rating) params.set('rating', filters.rating);
        if (filters.studio) params.set('studio', filters.studio);

        router.replace(`/films?${params}`, {scroll: false});

        await fetchMovies({
            limit: 36,
            page: 1,
            ...(filters.top250 ? {top250: {$exists: true}} : buildQuery(filters)),
        });
    }, [filters, fetchMovies, router]);

    const resetAll = useCallback(() => {
        dispatch(resetFilmFilters());
        router.replace('/films', {scroll: false});
    }, [dispatch, router]);

    const setPage = useCallback(
        async (page: number) => {
            await fetchMovies({
                limit: 36,
                page,
                ...(filters.top250 ? {top250: {$exists: true}} : buildQuery(filters)),
            });
        },
        [filters, fetchMovies]
    );

    return {
        filters,
        movies: data ?? initialData,
        isLoading: isFetching,
        applyFilters,
        resetAll,
        setPage,
    };
}