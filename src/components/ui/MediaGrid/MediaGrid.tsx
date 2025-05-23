import Link from "next/link";
import { Movie } from "../../../types";

interface MediaGridProps {
    movies: Movie[];
    mediaType: 'films' | 'games' | 'anime';
}

export function MediaGrid({ movies, mediaType }: MediaGridProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies?.map((movie) => (
                <Link
                    key={movie.imdbID}
                    href={`/${mediaType}/${movie.imdbID}`}
                    className="group"
                >
                    <div className="bg-ghoukie-gray rounded-lg overflow-hidden transition transform group-hover:scale-105">
                        <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">{movie.Title}</h3>
                            <p className="text-ghoukie-light-gray">{movie.Year}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}