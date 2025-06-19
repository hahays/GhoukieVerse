import {MediaCard} from "../MediaCard/MediaCard";

export const GameCard = ({game, isWatched = false}: { game: any, isWatched?: boolean }) => (
    <MediaCard item={game} mediaType="games" isWatched={isWatched}/>
);