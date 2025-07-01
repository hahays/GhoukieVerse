import {kinoApi} from '../instance'
import {MovieDetails, MovieResponse} from "../../../types/film";


export const filmsApi = kinoApi.injectEndpoints({
    endpoints: (build) => ({
        getTopMovies: build.query<MovieResponse, {
            limit?: number
            page?: number
            year?: string;
            'genres.name'?: string[];
            'countries.name'?: string;
            watched?: boolean;
            universe?: boolean;
        }>({
            query: (params) => {
                const queryParams = new URLSearchParams()

                if (params.limit) queryParams.append('limit', params.limit.toString())
                if (params.page) queryParams.append('page', params.page.toString())
                if (params.year) queryParams.append('year', params.year);
                if (params['genres.name']) {
                    params['genres.name'].forEach(genre => {
                        queryParams.append('genres.name', genre);
                    });
                }
                if (params['countries.name']) queryParams.append('countries.name', params['countries.name']);
                if (params.watched) queryParams.append('isWatched', 'true');
                if (params.universe) queryParams.append('isUniverse', 'true');

                queryParams.append('sortField', 'votes.kp')
                queryParams.append('sortType', '-1')
                queryParams.append('notNullFields', 'poster.url')
                queryParams.append('notNullFields', 'backdrop.url')
                queryParams.append('type', 'movie')

                return {
                    url: `movie?${queryParams.toString()}`,
                    headers: {
                        'X-API-KEY': process.env.NEXT_PUBLIC_KINO_API_KEY || ''
                    }
                }
            },
            serializeQueryArgs: ({endpointName, queryArgs}) => {
                const {year, ...rest} = queryArgs
                return `${endpointName}-${JSON.stringify(rest)}`
            },
            forceRefetch: ({currentArg, previousArg}) => {
                return JSON.stringify(currentArg?.year) !== JSON.stringify(previousArg?.year)
            },
            providesTags: ['Movies']
        }),

        getMovieDetails: build.query<MovieDetails, string>({
            query: (id) => `movie/${id}`,
            providesTags: (result, error, id) => [{type: 'MovieDetails', id}],
            transformResponse: (response: any) => {
                if (!response.poster?.url) {
                    response.poster = {url: '/placeholder-poster.jpg'}
                }
                if (!response.backdrop?.url) {
                    response.backdrop = {url: response.poster.url}
                }
                return {
                    ...response,
                    persons: response.persons || [],
                    videos: response.videos || {trailers: []},
                }
            }
        }),

        searchMovies: build.query<MovieResponse, { query: string; limit?: number }>({
            query: ({query, limit = 5}) => `movie/search?page=1&limit=${limit}&query=${query}`,
        }),
    })
})

export const {
    useGetTopMoviesQuery,
    useGetMovieDetailsQuery,
    useLazyGetTopMoviesQuery,
    useSearchMoviesQuery
} = filmsApi