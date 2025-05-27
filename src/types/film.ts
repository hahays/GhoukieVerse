export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    imdbRating?: string;
    userRating?: number;
    Runtime?: string;
    Plot: string;
    Released: string;
    Actors: string;
    Director: string;
    Genre: string;
    [key: string]: any;
}

export interface MovieDetails {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: {
        Source: string;
        Value: string;
    }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
    Backdrop?: string;
}

export interface OMDBResponse {
    Response: "True" | "False";
    Search?: Movie[];
    Error?: string;
    totalResults?: string;
}

export interface FilmCardProps {
    movie: Movie;
    onSelectMovie: (id: string) => void;
}
export interface FilmListProps {
    movies: Movie[];
    onSelectMovie: (id: string) => void;
    onCloseMovie?: () => void; // Опциональный пропс
}

