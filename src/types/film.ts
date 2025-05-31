// Данные из API OMDB, временно скрою их
// export interface Movie {
//     imdbID: string;
//     Title: string;
//     Year: string;
//     Poster: string;
//     imdbRating?: string;
//     userRating?: number;
//     Runtime?: string;
//     Plot: string;
//     Released: string;
//     Actors: string;
//     Director: string;
//     Genre: string;
//     Banner?: string;
//     [key: string]: any;
// }
//
// export interface MovieDetails {
//     Title: string;
//     Year: string;
//     Rated: string;
//     Released: string;
//     Runtime: string;
//     Genre: string;
//     Director: string;
//     Writer: string;
//     Actors: string;
//     Plot: string;
//     Language: string;
//     Country: string;
//     Awards: string;
//     Poster: string;
//     Ratings: {
//         Source: string;
//         Value: string;
//     }[];
//     Metascore: string;
//     imdbRating: string;
//     imdbVotes: string;
//     imdbID: string;
//     Type: string;
//     DVD: string;
//     BoxOffice: string;
//     Production: string;
//     Website: string;
//     Response: string;
//     Backdrop?: string;
//     Banner?: string;
// }
//
// export interface OMDBResponse {
//     Response: "True" | "False";
//     Search?: Movie[];
//     Error?: string;
//     totalResults?: string;
// }

// types.ts
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

//Kinopoisk API

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

