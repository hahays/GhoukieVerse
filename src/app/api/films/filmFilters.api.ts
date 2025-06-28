import {kinoApi} from '../instance'
import {FilterOption} from '../../../types/general'

export const filmFiltersApi = kinoApi.injectEndpoints({
    endpoints: (build) => ({
        getMovieGenres: build.query<FilterOption[], void>({
            query: () => 'movie/possible-values-by-field?field=genres.name',
            transformResponse: (response: { name: string }[]) =>
                response.map(item => ({value: item.name, label: item.name}))
        }),

        getMovieCountries: build.query<FilterOption[], void>({
            query: () => 'movie/possible-values-by-field?field=countries.name',
            transformResponse: (response: { name: string }[]) =>
                response.map(item => ({value: item.name, label: item.name}))
        }),

        getMovieYears: build.query<FilterOption[], void>({
            query: () => 'movie/possible-values-by-field?field=year',
            transformResponse: (response: { year: number }[]) =>
                response.map(item => ({value: item.year.toString(), label: item.year.toString()}))
        }),
    })
})

export const {
    useGetMovieGenresQuery,
    useGetMovieCountriesQuery,
    useGetMovieYearsQuery
} = filmFiltersApi