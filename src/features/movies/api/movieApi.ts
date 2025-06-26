import {MovieDetails, MovieFilterParams} from "../../../types/film";
import {fetchWithCache} from "../../../lib/utils/utils";

const BASE_URL = "https://api.kinopoisk.dev/v1.4/movie";

export const movieApi = {
    async getFilteredMovies(params: MovieFilterParams) {
        const queryParams = new URLSearchParams();


        if (params.years?.length) {
            params.years.forEach(year => queryParams.append('year', year.toString()));
        }
        if (params.rating) {
            queryParams.append('rating.kp', params.rating);
        }
        if (params.genres?.length) {
            params.genres.forEach(genre => queryParams.append('genres.name', genre));
        }

        queryParams.append('limit', params.limit?.toString() || '36');
        queryParams.append('page', params.page?.toString() || '1');
        queryParams.append('sortField', 'votes.kp');
        queryParams.append('sortType', '-1');
        queryParams.append('notNullFields', 'poster.url');
        queryParams.append('notNullFields', 'backdrop.url');
        queryParams.append('type', 'movie');

        const url = `${BASE_URL}?${queryParams.toString()}`;
        const data = await fetchWithCache(url);

        return {
            docs: data.docs.map((movie: any) => ({
                id: movie.id,
                name: movie.name,
                alternativeName: movie.alternativeName,
                year: movie.year,
                poster: movie.poster,
                backdrop: movie.backdrop,
                rating: movie.rating,
                genres: movie.genres,
                countries: movie.countries,
                movieLength: movie.movieLength,
            })),
            total: data.total
        };
    },

    async getMovieDetails(id: string): Promise<MovieDetails> {
        const url = `${BASE_URL}/${id}`;
        const data = await fetchWithCache(url);

        if (!data.poster?.url) {
            data.poster = {url: '/placeholder-poster.jpg'};
        }
        if (!data.backdrop?.url) {
            data.backdrop = {url: data.poster.url};
        }

        return {
            ...data,
            persons: data.persons || [],
            videos: data.videos || {trailers: []},
        };
    },


    async getGenres() {
        const url = `${BASE_URL}/possible-values-by-field?field=genres.name`;
        return await fetchWithCache(url);
    },

    async getCountries() {
        const url = `${BASE_URL}/possible-values-by-field?field=countries.name`;
        return await fetchWithCache(url);
    },

};