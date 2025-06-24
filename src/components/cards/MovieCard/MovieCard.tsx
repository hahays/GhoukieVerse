import { MediaCard } from "../MediaCard/MediaCard";

interface MovieCardProps {
    movie: any;
    isWatched?: boolean;
    onToggleWatched?: () => void;
}

export const MovieCard = ({ movie, isWatched = false, onToggleWatched }: MovieCardProps) => (
    <MediaCard
        item={movie}
        mediaType="films"
        isWatched={isWatched}
        onToggleWatched={onToggleWatched}
    />
);