import React, { useEffect, useState } from "react";
import {Loader} from "../../components/ui/Loader";
import {StarRating} from "../../components/ui/StarIcon";
import {Movie} from "../../types";


const KEY = process.env.NEXT_PUBLIC_API_KEY;



interface MediaDetailsCardProps {
  selectedID: string | null;
  onCloseMovie: () => void;
}

export const MediaDetailsCard: React.FC<MediaDetailsCardProps> = ({
                                                                    selectedID,
                                                                    onCloseMovie
                                                                  }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      if (!selectedID) return;

      setIsLoading(true);
      try {
        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
        );
        const data: Movie = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [selectedID]);

  if (isLoading) {
    return <Loader />;
  }

  if (!movie) {
    return <div className="text-center py-8">No movie selected</div>;
  }

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  return (
      <div className="bg-gray-800 rounded-lg p-6 text-gray-100">
        <header className="flex flex-col md:flex-row gap-6 mb-6">
          <button
              onClick={onCloseMovie}
              className="self-start bg-gray-700 hover:bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
              aria-label="Go back"
          >
            &larr;
          </button>

          <div className="flex-1 flex flex-col md:flex-row gap-6">
            <img
                src={poster}
                alt={`Poster of ${title}`}
                className="w-48 h-72 object-cover rounded-lg self-start"
            />

            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <div className="text-gray-400 mb-2">{year}</div>
              <p className="mb-2">
                {released} &bull; {runtime}
              </p>
              <p className="text-purple-400 mb-2">{genre}</p>
              <p className="flex items-center gap-1 mb-4">
                <span className="text-yellow-400">★</span>
                <span>{imdbRating} IMDb rating</span>
              </p>
            </div>
          </div>
        </header>

        <section className="space-y-4">
          <StarRating maxStars={10} size={24} />
          <p className="italic text-gray-300">{plot}</p>
          <p className="text-gray-400">Starring: {actors}</p>
          <p className="text-gray-400">Directed by {director}</p>
        </section>
      </div>
  );
};