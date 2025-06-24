import { useState, useEffect } from 'react';

type ContentType = 'films' | 'games' | 'anime';

export function useWatched() {
    const [watched, setWatched] = useState<Record<ContentType, number[]>>(() => {
        try {
            const stored = localStorage.getItem('ghoukie-watched');
            return stored ? JSON.parse(stored) : { films: [], games: [], anime: [] };
        } catch {
            return { films: [], games: [], anime: [] };
        }
    });

    useEffect(() => {
        localStorage.setItem('ghoukie-watched', JSON.stringify(watched));
    }, [watched]);

    const toggleWatched = (id: number, type: ContentType) => {
        setWatched(prev => {
            const current = prev[type];
            const newList = current.includes(id)
                ? current.filter(itemId => itemId !== id)
                : [...current, id];

            return { ...prev, [type]: newList };
        });
    };

    const isWatched = (id: number, type: ContentType) => watched[type].includes(id);
    const getWatchedItems = (type: ContentType) => watched[type];

    return { isWatched, toggleWatched, getWatchedItems };
}