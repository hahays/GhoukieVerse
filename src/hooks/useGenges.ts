import { useEffect, useState } from "react";

export const useGenres = () => {
    const [genres, setGenres] = useState<{value: string; label: string}[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(
                    'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name',
                    {
                        headers: {
                            'accept': 'application/json',
                            'X-API-KEY': process.env.NEXT_PUBLIC_KINO_API_KEY || ''
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                const formattedGenres = data.map((item: {name: string, slug: string}) => ({
                    value: item.name,
                    label: item.name
                }));

                setGenres(formattedGenres);
            } catch (error) {
                console.error('Error loading genres:', error);
                setError('Не удалось загрузить список жанров');
                setGenres([
                    { value: 'драма', label: 'Драма' },
                    { value: 'комедия', label: 'Комедия' },
                    { value: 'фантастика', label: 'Фантастика' },
                    { value: 'боевик', label: 'Боевик' },
                    { value: 'триллер', label: 'Триллер' }
                ]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGenres();
    }, []);

    return { genres, isLoading, error };
};