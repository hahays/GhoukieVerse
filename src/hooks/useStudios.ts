import { useEffect, useState } from 'react';

const FALLBACK_STUDIOS = [
    { value: 'marvel', label: 'Marvel Studios' },
    { value: 'warner-bros', label: 'Warner Bros.' },
    { value: 'universal', label: 'Universal Pictures' },
    { value: 'paramount', label: 'Paramount Pictures' },
    { value: '20th-century-fox', label: '20th Century Studios' },
    { value: 'sony', label: 'Sony Pictures' },
    { value: 'disney', label: 'Walt Disney Pictures' },
    { value: 'pixar', label: 'Pixar' },
    { value: 'dreamworks', label: 'DreamWorks Animation' },
    { value: 'a24', label: 'A24' },
    { value: 'lionsgate', label: 'Lionsgate' },
    { value: 'mosfilm', label: 'Мосфильм' },
    { value: 'ctb', label: 'СТВ' },
    { value: 'kinopoisk', label: 'Кинопоиск HD' }
];

export const useStudios = () => {
    const [studios, setStudios] = useState(FALLBACK_STUDIOS);
    const [isLoading, setIsLoading] = useState(false);

    const searchStudios = async (query: string) => {
        try {
            setIsLoading(true);
            const response = await fetch(
                `https://api.kinopoisk.dev/v1.4/studio?title=${encodeURIComponent(query)}&limit=5`,
                {
                    headers: {
                        'X-API-KEY': process.env.NEXT_PUBLIC_KINO_API_KEY || ''
                    }
                }
            );

            if (response.ok) {
                const data = await response.json();
                if (data.docs?.length > 0) {
                    return data.docs.map((studio: any) => ({
                        value: studio.id,
                        label: studio.title
                    }));
                }
            }
            return FALLBACK_STUDIOS;
        } catch (error) {
            console.error('Search studios error:', error);
            return FALLBACK_STUDIOS;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        studios,
        isLoading,
        searchStudios
    };
};