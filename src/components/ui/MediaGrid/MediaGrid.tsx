import Link from "next/link";
import Image from "next/image";
import { Movie } from "../../../types";
import { EllipsisHorizontalIcon, EyeIcon, HeartIcon } from "@heroicons/react/24/outline";

interface MediaGridProps {
    movies?: Movie[];
    mediaType: 'films' | 'games' | 'anime';
    isLoading?: boolean;
    error?: string | null;
    watchedMovies?: Set<number>;
}

export function MediaGrid({ movies, mediaType, isLoading, error, watchedMovies = new Set() }: MediaGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-10">
                {[...Array(12)].map((_, index) => (
                    <div key={index} className="bg-ghoukie-gray rounded-lg overflow-hidden animate-pulse aspect-[2/3]">
                        <div className="w-full h-full bg-ghoukie-dark-gray"/>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 p-4">Error: {error}</div>;
    }

    if (!movies || movies.length === 0) {
        return <div className="text-ghoukie-light-gray p-4">Ничего не найдено</div>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mt-8">
            {movies.map((movie) => {
                const isWatched = watchedMovies.has(movie.id);
                const posterUrl = movie.poster?.url || null;
                const title = movie.name || movie.alternativeName || "Без названия";
                const year = movie.year ? String(movie.year) : "Н/Д";

                return (
                    <div
                        key={movie.id}
                        className={`relative group aspect-[2/3] rounded-lg overflow-hidden transition-all duration-300 ${isWatched ? 'ring-2 ring-ghoukie-green' : ''}`}
                    >
                        <Link
                            href={{
                                pathname: `/${mediaType}/${movie.id}`,
                                query: { from: mediaType }
                            }}
                            className="absolute inset-0 z-10"
                            aria-label={`Подробнее о ${title}`}
                            passHref
                        >
                            <span className="sr-only">Подробнее о {title}</span>
                        </Link>

                        {posterUrl ? (
                            <Image
                                src={posterUrl}
                                alt={`Постер ${title}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                priority={false}
                            />
                        ) : (
                            <div className="w-full h-full bg-ghoukie-dark-gray flex items-center justify-center">
                                <span className="text-ghoukie-light-gray text-center px-2">
                                    {title}
                                </span>
                            </div>
                        )}

                        <div className="absolute inset-0 flex flex-col justify-end pointer-events-none">
                            <div className="bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-white font-semibold text-lg text-shadow-figma line-clamp-2 mb-1">
                                    {title}
                                </h3>
                                <p className="text-ghoukie-light-green text-lg font-medium text-shadow-figma">
                                    {year}
                                </p>
                            </div>
                        </div>

                        <div className="absolute top-0 left-0 right-0 flex justify-between p-2 pointer-events-none">
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                    className="p-2 rounded-full bg-black/70 hover:bg-ghoukie-green transition-colors pointer-events-auto"
                                    onClick={(e) => e.preventDefault()}
                                    aria-label="Добавить в просмотренные"
                                >
                                    <EyeIcon className="w-4 h-4 text-white"/>
                                </button>
                                <button
                                    className="p-2 rounded-full bg-black/70 hover:bg-ghoukie-purple transition-colors pointer-events-auto"
                                    onClick={(e) => e.preventDefault()}
                                    aria-label="Добавить в избранное"
                                >
                                    <HeartIcon className="w-4 h-4 text-white"/>
                                </button>
                            </div>

                            <button
                                className="p-2 rounded-full bg-black/70 hover:bg-ghoukie-dark-gray transition-colors opacity-0 group-hover:opacity-100 pointer-events-auto"
                                onClick={(e) => e.preventDefault()}
                                aria-label="Дополнительные действия"
                            >
                                <EllipsisHorizontalIcon className="w-4 h-4 text-white"/>
                            </button>
                        </div>

                        {isWatched && (
                            <div className="absolute top-2 right-2 bg-ghoukie-green text-black text-xs px-2 py-1 rounded-full font-bold pointer-events-none">
                                ✓
                            </div>
                        )}

                        {movie.rating?.kp && (
                            <div className="absolute top-2 left-2 bg-black/70 text-ghoukie-light-green text-xs px-2 py-1 rounded-full font-bold pointer-events-none">
                                {movie.rating.kp.toFixed(1)}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}