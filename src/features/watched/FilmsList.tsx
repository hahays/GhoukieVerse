import React from "react";

import {FilmCard} from "../../components/cards/FilmCard";
import {Movie} from "../../types";

interface FilmsListProps {
    watched: Movie[];
}

export const FilmsList: React.FC<FilmsListProps> = ({watched}) => {
    return (
        <ul className="grid grid-cols-1 gap-4">
            {watched.map((movie) => (
                <FilmCard
                    key={movie.imdbID}
                    movie={movie}
                    onSelectMovie={() => {
                    }}
                />
            ))}
        </ul>
    );
};