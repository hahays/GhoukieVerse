import React from 'react';
import {FilmCardProps} from "../../../types/film";



export const FilmCard: React.FC<FilmCardProps> = ({ movie, onSelectMovie }) => {
    return (
        <li
            onClick={() => onSelectMovie(movie.imdbID)}
            className="cursor-pointer hover:scale-105 transition-transform"
        >
            <img
                src={movie.Poster}
                alt={`${movie.Title} poster`}
                className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-3 bg-gray-800 rounded-b-lg">
                <h3 className="font-bold text-lg truncate">{movie.Title}</h3>
                <div className="flex items-center mt-1 text-gray-400">
                    <span className="mr-1">🗓</span>
                    <span>{movie.Year}</span>
                </div>
            </div>
        </li>
    );
};