import { useState, useEffect } from 'react';

type ContentType = 'films' | 'games' | 'anime';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState({
        films: [],
        games: [],
        anime: []
    });

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('ghoukie-favorites') || '{}');
        setFavorites({
            films: stored.films || [],
            games: stored.games || [],
            anime: stored.anime || []
        });
    }, []);

    const addToFavorites = (item: any, type: ContentType) => {
        const updated = {
            ...favorites,
            [type]: [...favorites[type], item]
        };
        setFavorites(updated);
        localStorage.setItem('ghoukie-favorites', JSON.stringify(updated));
    };

    const removeFromFavorites = (id: number, type: ContentType) => {
        const updated = {
            ...favorites,
            [type]: favorites[type].filter(item => item.id !== id)
        };
        setFavorites(updated);
        localStorage.setItem('ghoukie-favorites', JSON.stringify(updated));
    };

    const isFavorite = (id: number, type: ContentType) => {
        return favorites[type].some(item => item.id === id);
    };

    return { favorites, addToFavorites, removeFromFavorites, isFavorite };
};