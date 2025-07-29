import {kinoApi} from '../instance'
import {FilterOption} from '../../../types/general'
import {MovieResponse} from "../../../types/film";

const POPULAR_STUDIOS = [
    { value: '20403', label: 'Netflix' },
    { value: '3', label: 'Warner Bros.' },
    { value: '4', label: 'Universal Pictures' },
    { value: '5', label: 'Paramount Pictures' },
    { value: '6', label: '20th Century Studios' },
    { value: '7', label: 'Sony Pictures' },
    { value: '8', label: 'Walt Disney Pictures' },
    { value: '2', label: 'Pixar' },
    { value: '10', label: 'DreamWorks Animation' },
    { value: '11', label: 'A24' },
    { value: '12', label: 'Lionsgate' },
    { value: '13', label: 'Marvel Studios' },
    { value: '14', label: 'Mosfilm' },
    { value: '15', label: 'СТВ' },
    { value: '16', label: 'HBO' },
];
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



        getStudios: build.query<FilterOption[], void>({
            queryFn: () => ({ data: POPULAR_STUDIOS }),
        }),

        getMoviesByStudio: build.query<MovieResponse, { studioId: string }>({
            query: ({ studioId }) => ({
                url: 'movie',
                params: {
                    limit: 1,
                    page: 1,
                    'movies.id': studioId,
                    sortField: 'votes.kp',
                    sortType: '-1',
                    notNullFields: 'poster.url',
                    type: 'movie',
                },
                headers: {
                    'X-API-KEY': process.env.NEXT_PUBLIC_KINO_API_KEY || '',
                },
            }),
        }),

        getStudioWithMovies: build.query<
            { docs: { movies: { id: string }[] }[] },
            { studioId: string }
        >({
            query: ({ studioId }) => ({
                transformResponse: (response: { docs: { movies: { id: string }[] }[] }) => response,
                url: 'studio',
                params: {
                    id: studioId,
                    selectFields: 'movies',
                    limit: 1,
                },
                headers: {
                    'X-API-KEY': process.env.NEXT_PUBLIC_KINO_API_KEY || '',
                },
            }),
        }),
    })
})

export const {
    useGetMovieGenresQuery,
    useGetMovieCountriesQuery,
    useGetMovieYearsQuery,
    useGetStudiosQuery,
    useLazyGetStudiosQuery,
    useGetStudioWithMoviesQuery,
    useLazyGetStudioWithMoviesQuery,
} = filmFiltersApi