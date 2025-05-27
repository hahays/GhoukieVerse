import {PlayIcon} from "lucide-react";
import {MovieDetails} from "../../types/film";

export function MovieHeader({ movie }: { movie: MovieDetails }) {
    return (
        <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
            <div className="flex flex-wrap gap-2 items-center mb-4">
                <span className="text-ghoukie-light-green">{movie.Year}</span>
                <span>•</span>
                <span>{movie.Runtime}</span>
                <span>•</span>
                <span>{movie.Genre}</span>
                <button className="ml-auto flex items-center gap-1 text-ghoukie-light-green">
                    <PlayIcon className="w-5 h-5" />
                    Трейлер
                </button>
            </div>
        </div>
    );
}