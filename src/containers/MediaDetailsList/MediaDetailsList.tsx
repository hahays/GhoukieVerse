import React from "react";

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  imdbRating: string;
  userRating?: number;
  runtime: number;
}

interface MediaDetailsListProps {
  watched: Movie[];
  onClick?: () => void;
}

export const MediaDetailsList: React.FC<MediaDetailsListProps> = ({
                                                                    watched,
                                                                    onClick
                                                                  }) => {
  return (
      <ul
          onClick={onClick}
          className="grid grid-cols-1 gap-4 p-4 bg-gray-800 rounded-lg"
      >
        {watched.map((movie) => (
            <li
                key={movie.imdbID}
                className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <img
                  src={movie.Poster}
                  alt={`${movie.Title} poster`}
                  className="w-16 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-bold">{movie.Title}</h3>
                <div className="flex gap-4 mt-1 text-sm">
                  <p className="flex items-center gap-1">
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                  </p>
                  <p className="flex items-center gap-1">
                    <span>🌟</span>
                    <span>{movie.userRating || "N/A"}</span>
                  </p>
                  <p className="flex items-center gap-1">
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                  </p>
                </div>
              </div>
            </li>
        ))}
      </ul>
  );
};