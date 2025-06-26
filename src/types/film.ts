
export interface Movie {
    id: number;
    name: string;
    alternativeName?: string;
    year: number;
    poster?: {
        url: string;
        previewUrl: string;
    };
    rating?: {
        kp: number;
        imdb: number;
        filmCritics: number;
        russianFilmCritics: number;
        await: number;
    };
    genres: Array<{
        name: string;
    }>;
    countries: Array<{
        name: string;
    }>;
    movieLength?: number;
}


export interface MovieDetails {
    id: number;
    name: string;
    alternativeName?: string;
    year: number;
    description?: string;
    movieLength?: number;
    ageRating?: number;
    poster: {
        url: string;
        previewUrl?: string;
    };
    backdrop?: {
        url: string;
        previewUrl?: string;
    };
    rating: {
        kp: number;
        imdb?: number;
    };
    votes: {
        kp: number;
        imdb?: number;
    };
    genres: Array<{
        name: string;
    }>;
    countries: Array<{
        name: string;
    }>;
    persons: Array<{
        id: number;
        name?: string;
        enName?: string;
        description?: string;
        enProfession?: string;
    }>;
    videos?: {
        trailers: Array<{
            url: string;
            name: string;
            site: string;
        }>;
    };
}


export interface FilmListProps {
    movies: Movie[];
    onSelectMovie: (id: string) => void;
    onCloseMovie?: () => void;
}

export interface MovieFilterParams {
    years?: number[];
    rating?: string;
    genres?: string[];
    countries?: string[];
    platforms?: string[];
    limit?: number;
    page?: number;
}
