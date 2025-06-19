import Image from 'next/image';
import {EllipsisHorizontalIcon, EyeIcon, HeartIcon} from '@heroicons/react/24/outline';
import {useFavorites} from "../../../hooks/useFavorites";


interface MediaCardProps {
    item: any;
    mediaType: 'films' | 'games' | 'anime';
    isWatched?: boolean;
}

export const MediaCard = ({item, mediaType, isWatched = false}: MediaCardProps) => {
    const {isFavorite, addToFavorites, removeFromFavorites} = useFavorites();

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        isFavorite(item.id, mediaType)
            ? removeFromFavorites(item.id, mediaType)
            : addToFavorites(item, mediaType);
    };

    const posterUrl = item.poster?.url || null;
    const title = item.name || item.alternativeName || "Без названия";
    const year = item.year ? String(item.year) : "Н/Д";

    return (
        <div
            className={`relative aspect-[2/3] rounded-lg overflow-hidden transition-all duration-300 ${isWatched ? 'ring-2 ring-ghoukie-green' : ''}`}>
            {posterUrl ? (
                <Image
                    src={posterUrl}
                    alt={`Постер ${title}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
            ) : (
                <div className="w-full h-full bg-ghoukie-dark-gray flex items-center justify-center">
                    <span className="text-ghoukie-light-gray text-center px-2">{title}</span>
                </div>
            )}
            <div className="absolute inset-0 flex flex-col justify-end pointer-events-none">
                <div
                    className="bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white font-semibold text-lg text-shadow-figma line-clamp-2 mb-1">
                        {title}
                    </h3>
                    <p className="text-ghoukie-light-green text-lg font-medium text-shadow-figma">
                        {year}
                    </p>
                </div>
            </div>

            <div className="absolute top-0 left-0 right-0 flex justify-between p-2">
                {item.rating?.kp && (
                    <div className="bg-black/70 text-ghoukie-light-green text-xs px-2 py-1 rounded-full font-bold z-20">
                        {item.rating.kp.toFixed(1)}
                    </div>
                )}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        className="p-2 rounded-full bg-black/70 hover:bg-ghoukie-green transition-colors z-20"
                        onClick={(e) => e.preventDefault()}
                        aria-label="Добавить в просмотренные"
                    >
                        <EyeIcon className="w-4 h-4 text-white"/>
                    </button>
                    <button
                        className={`p-2 rounded-full transition-colors z-20 ${
                            isFavorite(item.id, mediaType)
                                ? 'bg-ghoukie-purple'
                                : 'bg-black/70 hover:bg-ghoukie-purple'
                        }`}
                        onClick={handleFavoriteClick}
                        aria-label={isFavorite(item.id, mediaType) ? "Удалить из избранного" : "Добавить в избранное"}
                    >
                        <HeartIcon
                            className={`w-4 h-4 text-white ${isFavorite(item.id, mediaType) ? 'fill-current' : ''}`}/>
                    </button>
                    <button
                        className="p-2 rounded-full bg-black/70 hover:bg-ghoukie-dark-gray transition-colors z-20"
                        onClick={(e) => e.preventDefault()}
                        aria-label="Дополнительные действия"
                    >
                        <EllipsisHorizontalIcon className="w-4 h-4 text-white"/>
                    </button>
                </div>
            </div>
            {isWatched && (
                <div
                    className="absolute top-2 right-2 bg-ghoukie-green text-black text-xs px-2 py-1 rounded-full font-bold pointer-events-none">
                    ✓
                </div>
            )}
        </div>
    );
};