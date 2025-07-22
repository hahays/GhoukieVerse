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
    const [studios, setStudios] = useState<{value: string; label: string}[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStudios = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Параметры запроса для получения студий с наибольшим рейтингом
                const params = new URLSearchParams({
                    limit: '15',
                    sortField: 'movies.rating.kp',
                    sortType: '-1',
                    selectFields: 'id,title',
                    notNullFields: 'title,id'
                });

                const response = await fetch(
                    `https://api.kinopoisk.dev/v1.4/studio?${params}`,
                    {
                        headers: {
                            'X-API-KEY': process.env.NEXT_PUBLIC_KINO_API_KEY || ''
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // Если API вернуло пустой массив, используем фолбэк
                if (!data.docs || data.docs.length === 0) {
                    throw new Error('API вернуло пустой список студий');
                }

                const formattedStudios = data.docs.map((studio: any) => ({
                    value: studio.id,
                    label: studio.title || `Студия ${studio.id}`
                }));

                setStudios(formattedStudios);
            } catch (error) {
                console.error('Ошибка загрузки студий:', error);
                setError('Не удалось загрузить список студий');
                setStudios(FALLBACK_STUDIOS);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStudios();
    }, []);

    return { studios, isLoading, error };
};