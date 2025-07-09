import { useEffect, useState } from 'react';

export const useGenres = () => {
    const [genres, setGenres] = useState<{value: string; label: string}[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGenres = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    'https://api.kinopoisk.dev/v1.3/movie/possible-values-by-field?field=genres.name',
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
                setGenres(data.map((genre: string) => ({
                    value: genre.toLowerCase(),
                    label: genre
                })));
            } catch (err) {
                console.error('Error loading genres:', err);
                setError('Не удалось загрузить жанры');
                setGenres([
                    { value: 'драма', label: 'Драма' },
                    { value: 'комедия', label: 'Комедия' },
                    { value: 'фантастика', label: 'Фантастика' }
                ]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGenres();
    }, []);

    return { genres, isLoading, error };
};