import {kinoApi} from '../instance'
import {MovieDetails, MovieResponse} from "../../../types/film";


export const filmsApi = kinoApi.injectEndpoints({
    endpoints: (build) => ({
        getTopMovies: build.query<MovieResponse, {
            limit?: number
            page?: number
            year?: string;
            'countries.name'?: string;
            watched?: boolean;
            budget?: string;
            language?: string;
            isImax?: boolean;
            'watchability.items.name'?: string;
            ageRating?: { $gte?: number };
            movieLength?: { $lt?: number; $gte?: number; $lte?: number } | number;
            is3d?: boolean;
            'awards.name'?: string;
            'persons.name'?: string;
            'names.language'?: string;
            universe?: boolean;
            'rating.imdb'?: string;
            'rating.kp'?: string;
            'genres.name'?: string[];
            'sequelsAndPrequels.id'?: { $exists: boolean };
            'similarMovies.id'?: { $exists: boolean; $nin: (null | string)[] };
            'top250'?: { $exists: boolean; $lte: number };
            'productionCompanies.name'?: string;
            'persons.enProfession'?: string;
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

                if (params.ageRating) queryParams.append('ageRating', params.ageRating);
                if (params['persons.name']) queryParams.append('persons.name', params['persons.name']);
                if (params.language) queryParams.append('language', params.language);

                if (params.language) queryParams.append('language', params.language);
                if (params['awards.name']) queryParams.append('awards.name', params['awards.name']);
                if (params.is3d) queryParams.append('is3d', 'true');
                if (params.isImax) queryParams.append('isImax', 'true');
                if (params['productionCompanies.name']) {
                    queryParams.append('productionCompanies.name', params['productionCompanies.name']);
                }

                if (params['persons.enProfession']) {
                    queryParams.append('persons.enProfession', params['persons.enProfession']);
                }


                if (params['rating.imdb']) {
                    queryParams.append('rating.imdb', params['rating.imdb']);
                } else if (params['rating.kp']) {
                    queryParams.append('rating.kp', params['rating.kp']);
                }

                if (params['genres.name']) {
                    params['genres.name'].forEach(genre => {
                        queryParams.append('genres.name', genre);
                    });
                }

                if (params['top250']?.$exists) {
                    queryParams.append('top250', '!null');
                    queryParams.append('top250', `<=${params['top250'].$lte}`);
                }

                if (params['sequelsAndPrequels.id']?.$exists) {
                    queryParams.append('sequelsAndPrequels.id', 'exists');
                } else if (params['similarMovies.id']?.$exists) {
                    queryParams.append('similarMovies.id', 'exists');
                }

                if (params['watchability.items.name']) {
                    queryParams.append('watchability.items.name', params['watchability.items.name']);
                }
                if (params.ageRating) {
                    queryParams.append('ageRating', JSON.stringify(params.ageRating));
                }

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