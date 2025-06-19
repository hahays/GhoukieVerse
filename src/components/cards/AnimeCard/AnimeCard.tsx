import {MediaCard} from "../MediaCard/MediaCard";

export const AnimeCard = ({ anime, isWatched = false }: { anime: any, isWatched?: boolean }) => (
    <MediaCard item={anime} mediaType="anime" isWatched={isWatched} />
);