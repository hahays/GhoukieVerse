import { useEffect, useState } from 'react';
import { filmsApi } from '../app/api/films/films.api';

export const useFilmFiltersData = () => {
    const [filterOptions, setFilterOptions] = useState({
        genres: [] as Array<{ value: string; label: string }>,
        countries: [] as Array<{ value: string; label: string }>,
        years: [] as Array<{ value: string; label: string }>,
        platforms: [] as Array<{ value: string; label: string }>,
        awards: [] as Array<{ value: string; label: string }>,
        isLoading: true,
        error: null as Error | null,
    });

    const [triggerMovies] = filmsApi.useLazyGetTopMoviesQuery();

    useEffect(() => {
        const loadFilterData = async () => {
            try {

                const { data: moviesData } = await triggerMovies({
                    limit: 500,
                    selectFields: ['genres', 'countries', 'year', 'watchability']
                });

                if (moviesData?.docs) {
                    const allGenres = moviesData.docs.flatMap(movie =>
                        movie.genres?.map(genre => genre.name.toLowerCase()) || []
                    );
                    const uniqueGenres = [...new Set(allGenres.filter(Boolean))];

                    const allCountries = moviesData.docs.flatMap(movie =>
                        movie.countries?.map(country => country.name) || []
                    );
                    const uniqueCountries = [...new Set(allCountries.filter(Boolean))];


                    const allPlatforms = moviesData.docs.flatMap(movie =>
                        movie.watchability?.items?.map(item => item.name) || []
                    );
                    const uniquePlatforms = [...new Set(allPlatforms.filter(Boolean))];

                    const currentYear = new Date().getFullYear();
                    const years = Array.from({ length: 30 }, (_, i) => ({
                        value: (currentYear - i).toString(),
                        label: (currentYear - i).toString(),
                    }));

                    setFilterOptions({
                        genres: uniqueGenres.map(genre => ({
                            value: genre,
                            label: genre.charAt(0).toUpperCase() + genre.slice(1)
                        })),
                        countries: uniqueCountries.map(country => ({
                            value: country,
                            label: country
                        })),
                        years: [{ value: '', label: 'Год' }, ...years],
                        platforms: uniquePlatforms.map(platform => ({
                            value: platform.toLowerCase(),
                            label: platform
                        })),
                        awards: [
                            { value: 'oscar', label: 'Оскар' },
                            { value: 'golden-globe', label: 'Золотой глобус' }
                        ],
                        isLoading: false,
                        error: null
                    });
                }
            } catch (error) {
                console.error('Failed to load filter data:', error);
                setFilterOptions(prev => ({
                    ...prev,
                    isLoading: false,
                    error: error as Error
                }));
            }
        };

        loadFilterData();
    }, [triggerMovies]);

    return filterOptions;
};