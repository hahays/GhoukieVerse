
export interface Movie {
    top250: any;
    watchability: any;
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

export interface MovieResponse {
    docs: Movie[];
    total: number;
    limit: number;
    page: number;
    pages: number;
}

export interface YearRange {
    from?: string;
    to?: string;
}

export interface FilmFilters {
    watched: boolean
    action: boolean
    drama: boolean
    comedy: boolean
    horror: boolean
    universe: boolean
    rating: string
    platform: string
    genre: string
    country: string
    duration: string
    tag: string
    favorite: boolean;
    actor: string;
    actors: string;
    directors: string;
    'rating.imdb'?: string;
    'rating.kp'?: string;
    'genres.name'?: string[];
    'sequelsAndPrequels.id'?: { $exists: boolean };
    'similarMovies.id'?: { $exists: boolean; $nin: (null | string)[] };
    'top250'?: { $exists: boolean; $lte: number };
    operator: string;
    'productionCompanies.name'?: string;
    'persons.enProfession'?: string;
    year?: YearRange;
    genres?: string[];
    studio?: string;
    age?: string;
    popularity?: 'high' | 'medium' | 'low';
    type?: string;
    movieLength?: string;
    countries?: string[];
    award?: string;
    is3d?: boolean;
    isImax?: boolean;
    budget?: {
        from?: number;
        to?: number;
    };
    language?: string;
    date?: 'month' | 'year' | 'old';
    feesWorld?: string;
}

export interface MovieFilterParams {
    year: { from: string; to: string };
    genres: string[];
    countries: string[];
    rating: string;
    platform: string;
    duration: string;
    date: string;
    tag: string;
    age: string;
    popularity: string;
    watched: boolean;
    universe: boolean;
    isInitialized: boolean;
    favorite: boolean;
    actor: string;
    language?: string;
    'persons.name'?: string;
    'awards.name'?: string;
    is3d?: boolean;
    isImax?: boolean;
    'rating.imdb'?: string;
    'rating.kp'?: string;
    'genres.name'?: string[];
    'sequelsAndPrequels.id'?: { $exists: boolean };
    'similarMovies.id'?: { $exists: boolean; $nin: (null | string)[] };
    'top250'?: { $exists: boolean; $lte: number };
    'productionCompanies.name'?: string;
    studio: string;
    'persons.enProfession'?: string;
}
export interface Top250Movie {
    id: number;
    name: string;
    poster?: {
        url: string;
        previewUrl: string;
    };
}

export interface Top250List {
    movies: Top250Movie[];
}

export interface Top250Response {
    docs: Top250List[];
    total: number;
    limit: number;
    page: number;
    pages: number;
}