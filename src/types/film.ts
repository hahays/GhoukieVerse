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
    [key: string]: any; // Для дополнительных полей, которые могут прийти из API
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

