import React from "react";
import {Movie} from "../../../types";


interface WatchedMovieProps {
    movie: Movie;
}

export const WatchedMovie: React.FC<WatchedMovieProps> = ({ movie }) => {
    return (
        <li className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg mb-2">
            <img
                src={movie.Poster}
                alt={`${movie.Title} poster`}
                className="w-12 h-16 object-cover"
            />
            <div>
                <h3 className="font-bold">{movie.Title}</h3>
                <div className="flex gap-4 mt-1 text-sm">
                    <p className="flex items-center gap-1">
                        <span>⭐️</span>
                        <span>{movie.imdbRating || 'N/A'}</span>
                    </p>
                    <p className="flex items-center gap-1">
                        <span>🌟</span>
                        <span>{movie.userRating || 'N/A'}</span>
                    </p>
                    <p className="flex items-center gap-1">
                        <span>⏳</span>
                        <span>{movie.Runtime} min</span>
                    </p>
                </div>
            </div>
        </li>
    );
};