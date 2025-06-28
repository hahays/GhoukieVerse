'use client'

import {useAppDispatch, useAppSelector} from '../stores/hooks'

import {useLazyGetTopMoviesQuery} from "../app/api/films/films.api";
import {
    useGetMovieCountriesQuery,
    useGetMovieGenresQuery,
    useGetMovieYearsQuery
} from "../app/api/films/filmFilters.api";
import {setFilmFilter} from "../stores/slices/films/filmFilters.slice";


export const useMovieFilters = () => {
    const dispatch = useAppDispatch()
    const filters = useAppSelector(state => state.filmFilters)
    const [trigger, {data, isLoading, error}] = useLazyGetTopMoviesQuery()

    const {data: genres} = useGetMovieGenresQuery()
    const {data: countries} = useGetMovieCountriesQuery()
    const {data: years} = useGetMovieYearsQuery()

    const applyFilters = (newFilters: Partial<typeof filters>) => {
        dispatch(setFilmFilter(newFilters))
        trigger({
            limit: 36,
            ...newFilters
        })
    }

    return {
        filters,
        movies: data?.docs || [],
        total: data?.total || 0,
        isLoading,
        error,
        applyFilters,
        filterOptions: {
            genres: genres || [],
            countries: countries || [],
            years: years || []
        }
    }
}