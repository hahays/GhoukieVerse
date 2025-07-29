import {kinoApi} from '../instance'
import {MovieDetails, MovieResponse} from "../../../types/film";
import {string} from "postcss-selector-parser";


export const filmsApi = kinoApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (build) => ({
        getTopMovies: build.query<MovieResponse, {
            createdAt?: string;
            studio: any;
            type?: string;
            limit?: number
            page?: number
            year?: string;
           award?: string;
            fees?: { world: string }
            'countries.name'?: string;
            watched?: boolean;
            budget?: string;
            language?: string;
            isImax?: boolean;
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
            'networks.items.name'?: string;
            'watchability.items.name'?: string;
            ageRating?: number;
            'fees.world'?: { $gte?: number; $lt?: number };
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
                if (params['budget.value']) queryParams.append('budget.value', params['budget.value']);

                if (params['countries.name']) queryParams.append('countries.name', params['countries.name']);
                if (params.watched) queryParams.append('isWatched', 'true');
                if (params.universe) queryParams.append('isUniverse', 'true');
                if (params.ageRating) queryParams.append('ageRating', params.ageRating);
                if (params['persons.name']) queryParams.append('persons.name', params['persons.name']);
                if (params.language) queryParams.append('language', params.language);
                if (params['awards.name']) queryParams.append('awards.name', params['awards.name']);
                if (params.is3d) queryParams.append('is3d', 'true');
                if (params.isImax) queryParams.append('isImax', 'true');
                if (params['movies.studio.id']) {
                    queryParams.append('movies.studio.id', params['movies.studio.id']);
                }
                if (params['persons.name']) queryParams.append('persons.name', params['persons.name']);
                if (params['persons.enProfession']) queryParams.append('persons.enProfession', params['persons.enProfession']);
                if (params.createdAt) {
                    queryParams.append('createdAt', params.createdAt);
                }
                if (params['names.language']) queryParams.append('names.language', params['names.language']);
                if (params['fees.world']) queryParams.append('fees.world', params['fees.world']);
                if (params['persons.enProfession']) {
                    queryParams.append('persons.enProfession', params['persons.enProfession']);
                }
                if (params['watchability.items.name']) {
                    queryParams.append('watchability.items.name', params['watchability.items.name']);
                }
                if (params.ageRating) {
                    queryParams.append('ageRating', params.ageRating.toString());
                }
                if (params['fees.world']) {
                    if (params['fees.world'].$gte) {
                        queryParams.append('fees.world', `>=${params['fees.world'].$gte}`);
                    }
                    if (params['fees.world']) {
                        if (typeof params['fees.world'] === 'object') {
                            if (params['fees.world'].$gte) {
                                queryParams.append('fees.world', `>=${params['fees.world'].$gte}`);
                            }
                            if (params['fees.world'].$lt) {
                                queryParams.append('fees.world', `<${params['fees.world'].$lt}`);
                            }
                        } else {
                            queryParams.append('fees.world', params['fees.world']);
                        }
                    }
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

                if (params['productionCompanies.id']) {
                    queryParams.append('productionCompanies.id', params['productionCompanies.id']);
                }
                if (params['countries.name']) {
                    params['countries.name'].forEach(country => {
                        queryParams.append('countries.name', country);
                    });
                }
                if (params.ageRating) {
                    queryParams.append('ageRating', params.ageRating);
                }
                if (params.type) {
                    queryParams.append('type', params.type);
                }
               if (params.movieLength) {
                   queryParams.append('movieLength', params.movieLength);
               }
                if (params['votes.kp']) {
                    if (params['votes.kp'].$gte) {
                        queryParams.append('votes.kp', `>=${params['votes.kp'].$gte}`);
                    }
                    if (params['votes.kp'].$lt) {
                        queryParams.append('votes.kp', `<${params['votes.kp'].$lt}`);
                    }

                }

                queryParams.append('sortField', 'votes.kp')
                queryParams.append('sortType', '-1')
                queryParams.append('notNullFields', 'poster.url')
                queryParams.append('notNullFields', 'backdrop.url')
                if (!params.type) {
                    queryParams.append('type', 'movie');
                }

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



        getPlatforms: build.query<{ value: string; label: string }[], void>({
            query: () => ({
                url: 'movie',
                params: {
                    limit: 100,
                    selectFields: 'watchability',
                },
                headers: {'X-API-KEY': process.env.NEXT_PUBLIC_KINO_API_KEY || ''},
            }),
            transformResponse: (response: any) => {
                const fallbackPlatforms = [
                    {value: 'Иви', label: 'IVI'},
                    {value: 'Okko', label: 'Okko'},
                    {value: 'kinopoisk', label: 'Кинопоиск HD'},
                    {value: 'netflix', label: 'Netflix'},
                    {value: 'disney', label: 'Disney+'},
                    {value: 'Wink', label: 'Wink'},
                    {value: 'start', label: 'START'},
                    {value: 'PREMIER', label: 'PREMIER'},
                    {value: 'KION', label: 'KION'},
                    {value: 'Кино1ТВ', label: 'Кино1ТВ'},
                    {value: 'AMEDIATEKA', label: 'AMEDIATEKA'},
                ];
                try {
                    if (response?.docs) return fallbackPlatforms;

                    const platforms = new Set<string>();

                    response.docs.forEach((movie: any) => {
                        movie.watchability?.items?.forEach((item: any) => {
                            if (item?.name) {
                                platforms.add(item.name);
                            }
                        });
                    });

                    return platforms.size > 0
                        ? Array.from(platforms).map(name => ({
                            value: name.toLowerCase().replace(/\s+/g, '-'),
                            label: name
                        }))
                        : fallbackPlatforms;
                } catch (error) {
                    console.error('Error transforming platforms:', error);
                    return fallbackPlatforms;
                }
            }
        }),

        getMoviesByAwards: build.query<MovieResponse, { award: string }>({
            query: ({ award }) => ({
                url: 'movie/awards',
                params: {
                    'nomination.award.title': award,
                    winning: true,
                    limit: 100,
                    selectFields: 'movieId'
                }
            }),
            transformResponse: (response) => {
                const movieIds = response.docs.map(doc => doc.movieId);
                return {
                    url: 'movie',
                    params: {
                        id: movieIds.join(','),
                        limit: 36
                    }
                };
            }
        }),

        getPersons: build.query({
            query: (name) => ({
                url: 'person/search',
                params: { query: name, limit: 5 },
            }),
        }),

        getAgeRatings: build.query<{ value: string; label: string }[], void>({
            query: () => ({
                url: `movie`,
                params: {
                    selectFields: 'ageRating',
                    limit: 100
                },
                headers: {
                    'X-API-KEY': process.env.NEXT_PUBLIC_KINO_API_KEY || ''
                }
            }),
            transformResponse: (response: any) => {
                const ratings = new Set<number>();
                response.docs.forEach((doc: any) => {
                    if (typeof doc.ageRating === 'number') {
                        ratings.add(doc.ageRating);
                    }
                });
                return Array.from(ratings).map(rating => ({
                    value: rating.toString(),
                    label: `${rating}+`
                }));
            }
        }),


        getPopularities: build.query<{ value: string; label: string }[], void>({
            query: () => ({
                url: 'movie',
                params: {
                    selectFields: 'fees.world',
                    limit: 100
                }
            }),
            transformResponse: () => {
                return [
                    {value: 'high', label: 'Высокая'},
                    {value: 'medium', label: 'Средняя'},
                    {value: 'low', label: 'Низкая'}
                ]
            }
        }),

        getTop250Movies: build.query<MovieResponse, {
            page?: number;
            limit?: number;
        }>({
            query: (params) => ({
                url: `movie`,
                params: {
                    page: params.page || 1,
                    limit: params.limit || 36,
                    top250: {$exists: true, $lte: 250},
                    sortField: 'top250',
                    sortType: '1',
                    notNullFields: 'poster.url',
                    type: 'movie'
                },
                headers: {
                    'X-API-KEY': process.env.NEXT_PUBLIC_KINO_API_KEY || ''
                }
            }),
            transformResponse: (response: any) => ({
                docs: response.docs.filter((movie) => movie.top250 > 0 && movie.top250 <= 250),
                total: 250,
                limit: response.limit || 36,
                page: response.page || 1,
                pages: Math.ceil(250 / (response.limit || 36))
            })
        }),


        getMovieDetails: build.query<MovieDetails, string>({
            query: (id) => `movie/${id}`,
            providesTags: (result, error, id) => [{type: 'MovieDetails', id}]
        }),
        getMoviesByStudioIds: build.query<MovieResponse, { ids: string[] }>({
            query: ({ ids }) => ({
                url: 'movie',
                params: {
                    limit: 1,
                    page: 1,
                    id: ids.join(','),
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
    })

})


export const {
    useGetTopMoviesQuery,
    useLazyGetTopMoviesQuery,
    useGetTop250MoviesQuery,
    useLazyGetTop250MoviesQuery,
    useGetMovieDetailsQuery,
    useGetPlatformsQuery,
    useGetAgeRatingsQuery,
    useGetPopularitiesQuery,
    useGetMoviesByStudioIdsQuery,
    useGetPersonsQuery,
    useLazyGetMoviesByStudioIdsQuery,
    useGetMoviesByAwardsQuery
} = filmsApi;
