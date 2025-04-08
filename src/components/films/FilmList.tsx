import React, {useState} from 'react';
import {FilmListProps} from "../../types/film";
import {FilmCard} from "../cards/FilmCard/FilmCard";


export const FilmList: React.FC<FilmListProps> = ({
                                                      movies,
                                                      onSelectMovie,
                                                      onCloseMovie
                                                  }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <button
                className="flex items-center justify-center w-8 h-8 bg-gray-700 rounded-full mb-2"
                onClick={() => setIsOpen((open) => !open)}
                aria-label={isOpen ? 'Collapse list' : 'Expand list'}
            >
                {isOpen ? '–' : '+'}
            </button>

            {isOpen && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {movies?.map((movie) => (
                        <li key={movie.imdbID}>
                            <FilmCard
                                movie={movie}
                                onSelectMovie={onSelectMovie}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};