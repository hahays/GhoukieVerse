import { StarRating } from "@/components/ui/StarRating";
import React, { useEffect, useState } from "react";
import { Loader } from "../Loader";

const KEY = process.env.NEXT_PUBLIC_API_KEY;

function MediaDetailsCard({ selectedID, onCloseMovie }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    Title: title = "",
    Year: year = "",
    Poster: poster = "",
    Runtime: runtime = "",
    imdbRating = "",
    Plot: plot = "",
    Released: released = "",
    Actors: actors = "",
    Director: director = "",
    Genre: genre = "",
  } = movie;

  useEffect(() => {
    async function getMediaDetailsCard() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
        );
        const data = await response.json();
        setMovie(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }

    if (selectedID) {
      getMediaDetailsCard();
    }
  }, [selectedID]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <div>{year}</div>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                {/* иконка звезды */}
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <StarRating maxStars={10} size={24} />
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed by {director}</p>
          </section>
          {/* ... остальной рендеринг данных о фильме */}
        </>
      )}
    </div>
  );
}

export default MediaDetailsCard;
