
import {MediaCard} from "../MediaCard/MediaCard";

export const MovieCard = ({ movie, isWatched = false }: { movie: any, isWatched?: boolean }) => (
    <MediaCard item={movie} mediaType="films" isWatched={isWatched} />
);