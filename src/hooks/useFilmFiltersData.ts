import { useEffect, useState } from 'react';
import { filmsApi } from '../app/api/films/films.api';

export const useFilmFiltersData = () => {
    const [filterOptions, setFilterOptions] = useState({
        genres: [] as Array<{ value: string; label: string }>,
        countries: [] as Array<{ value: string; label: string }>,
        years: [] as Array<{ value: string; label: string }>,
        platforms: [] as Array<{ value: string; label: string }>,
        awards: [] as Array<{ value: string; label: string }>,
        ages: [] as Array<{ value: string; label: string }>,
        popularities: [] as Array<{ value: string; label: string }>,
        isLoading: true,
        error: null as Error | null,
    });

    const [triggerMovies] = filmsApi.useLazyGetTopMoviesQuery();
    const { data: platformsData, isLoading: isPlatformsLoading, error: platformsError } =
        filmsApi.useGetWatchabilityPlatformsQuery();

    useEffect(() => {
        const loadFilterData = async () => {
            try {

                const { data: moviesData } = await triggerMovies({
                    limit: 500,
                    selectFields: ['genres', 'countries', 'year']
                });

                const platforms = platformsData?.map(p => ({
                    value: p.name.toLowerCase(),
                    label: p.name
                })) || [];

                const finalPlatforms = platforms.length > 0 ? platforms : [
                    { value: 'netflix', label: 'Netflix' },
                    { value: 'amazon', label: 'Amazon Prime' },
                    // ... другие платформы
                ];

                if (moviesData?.docs) {
                    const allGenres = moviesData.docs.flatMap(movie =>
                        movie.genres?.map(genre => genre.name.toLowerCase()) || []
                    );
                    const uniqueGenres = [...new Set(allGenres.filter(Boolean))];

                    const allCountries = moviesData.docs.flatMap(movie =>
                        movie.countries?.map(country => country.name) || []
                    );
                    const uniqueCountries = [...new Set(allCountries.filter(Boolean))];


                    const platforms = platformsData?.docs[0]?.watchability?.items?.map(item => ({
                        value: item.name.toLowerCase(),
                        label: item.name
                    })) || [];


                    const ages = [
                        { value: '6', label: '6+' },
                        { value: '12', label: '12+' },
                        { value: '16', label: '16+' },
                        { value: '18', label: '18+' },
                        { value: '21', label: '21+' }
                    ];


                    const popularities = [
                        { value: 'blockbuster', label: 'Блокбастеры' },
                        { value: 'high', label: 'Высокая' },
                        { value: 'medium', label: 'Средняя' },
                        { value: 'low', label: 'Низкая' }
                    ];

                    const currentYear = new Date().getFullYear();
                    const years = Array.from({ length: 30 }, (_, i) => ({
                        value: (currentYear - i).toString(),
                        label: (currentYear - i).toString(),
                    }));

                    const ageRatings = [
                        { value: '6', label: '6+' },
                        { value: '12', label: '12+' },
                        { value: '16', label: '16+' },
                        { value: '18', label: '18+' }
                    ];

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
                        platforms: finalPlatforms,
                        awards: [
                            { value: 'oscar', label: 'Оскар' },
                            { value: 'golden-globe', label: 'Золотой глобус' }
                        ],
                        ages,
                        popularities,
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