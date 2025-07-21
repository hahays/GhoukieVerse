import {
    useGetAgeRatingsQuery,
    useGetPlatformsQuery,
    useGetPopularitiesQuery,
    useLazyGetTopMoviesQuery
} from '../app/api/films/films.api';
import {useEffect, useState} from "react";

export const useFilmFiltersData = () => {

    const {
        data: platforms = [],
        isLoading: isPlatformsLoading,
        error: platformsError
    } = useGetPlatformsQuery();
    const {data: ages = [], isLoading: isAgesLoading} = useGetAgeRatingsQuery();
    const {data: popularities = [], isLoading: isPopularitiesLoading} = useGetPopularitiesQuery();


    const [triggerMovies, {isLoading: isMoviesLoading}] = useLazyGetTopMoviesQuery();

    const [filterOptions, setFilterOptions] = useState({
        genres: [] as Array<{ value: string; label: string }>,
        countries: [] as Array<{ value: string; label: string }>,
        years: [] as Array<{ value: string; label: string }>,
        isLoading: true,
    });

    useEffect(() => {
        const loadFilterData = async () => {
            try {
                const {data: moviesData} = await triggerMovies({
                    limit: 500,
                    selectFields: ['genres', 'countries', 'year']
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
                    const currentYear = new Date().getFullYear();
                    const years = Array.from({length: 30}, (_, i) => ({
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
                        years: [{value: '', label: 'Год'}, ...years],
                        isLoading: false
                    });
                }
            } catch (error) {
                console.error('Failed to load filter data:', error);
                setFilterOptions(prev => ({
                    ...prev,
                    isLoading: false
                }));
            }
        };

        loadFilterData();
    }, [triggerMovies]);

    return {
        platforms,
        ages,
        popularities,
        genres: filterOptions.genres,
        countries: filterOptions.countries,
        years: filterOptions.years,
        isLoading: isPlatformsLoading || isAgesLoading || isPopularitiesLoading || filterOptions.isLoading,
        error: platformsError
    };
};