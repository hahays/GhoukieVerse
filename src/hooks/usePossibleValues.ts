import { useEffect, useState } from 'react';

export const usePossibleValues = (field: string) => {
    const [values, setValues] = useState<{ value: string; label: string }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchValues = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(
                    `https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=${field}`,
                    {
                        headers: {
                            'accept': 'application/json',
                            'X-API-KEY': process.env.NEXT_PUBLIC_KINO_API_KEY || '',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const formatted = data.map((item: { name: string }) => ({
                    value: item.name,
                    label: item.name,
                }));

                setValues(formatted);
            } catch (error) {
                console.error(`Error loading ${field}:`, error);
                setError(`Не удалось загрузить список ${field}`);
                setValues([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchValues();
    }, [field]);

    return { values, isLoading, error };
};