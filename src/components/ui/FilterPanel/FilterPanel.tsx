import React, {useCallback, useState} from 'react'
import {Select} from '../Select/Select'
import {ButtonToggle} from '../ButtonToggle/ButtonToggle'
import {Button} from '../Button'
import {RangeSelect} from '../RangeSelect/RangeSelect'
import {ChevronDown, Trash2} from 'lucide-react'
import {FilterLabel} from "../FilterLabel/FilterLabel"
import {FilterValues} from "../../../types/film"
import {FilterPanelProps} from "./types"
import {useAppDispatch, useAppSelector} from "../../../stores/hooks"
import {resetFilmFilters} from "../../../stores/slices/films/filmFilters.slice"
import {Spinner} from "../Spinner/Spinner"
import {Collapse} from '../Collapse/Collapse'
import {SearchInput} from "../SearchInput/SearchInput";
import {useFilmFiltersData} from "../../../hooks/useFilmFiltersData";
import {useGenres} from "../../../hooks/useGenges";

export const FilterPanel = ({
                                genres = [],
                                years = [],
                                ratings = [],
                                platforms = [],
                                countries = [],
                                durations = [],
                                dates = [],
                                tags = [],
                                onFilterChange,
                                className = '',
                                onApplyFilters,
                                previewCount,
                                isLoadingPreview,
                            }: FilterPanelProps) => {
    const dispatch = useAppDispatch()
    const filters = useAppSelector(state => state.filmFilters)
    const [isExpanded, setIsExpanded] = useState(false)
    const [ratingType, setRatingType] = useState<'kp' | 'imdb' | 'tmdb'>('kp');
    const [ratingRange, setRatingRange] = useState<{min: string, max: string}>({min: '', max: ''});

    const {
        countries: apiCountries,
        years: apiYears,
        platforms: apiPlatforms,
        awards: apiAwards,
        isLoading: isLoadingFilters,
        error: filtersError
    } = useFilmFiltersData();

    const { genres: apiGenres, isLoading: genresLoading } = useGenres();

    const safeApiYears = apiYears || [];
    const safeApiGenres = apiGenres || [];
    const safeApiCountries = apiCountries || [];

    const handleGenreToggle = (genre: string) => {
        const currentGenres = filters.genres || [];
        let newGenres: string[];

        if (genre === '') {
            newGenres = [];
        } else {
            newGenres = currentGenres.includes(genre)
                ? currentGenres.filter(g => g !== genre)
                : [...currentGenres, genre];
        }

        onFilterChange({
            genres: newGenres,
            'genres.name': newGenres.length > 0 ? newGenres : undefined
        });
    };


    const ratingOptions = [
        { value: '', label: 'Рейтинг' },
        { value: '9-10', label: '9+ (Отлично)' },
        { value: '8-10', label: '8+ (Очень хорошо)' },
        { value: '7-10', label: '7+ (Хорошо)' },
        { value: '6-10', label: '6+ (Неплохо)' },
        { value: '5-10', label: '5+ (Так себе)' }
    ];



    const defaultOptions = {
        years: safeApiYears.length > 1 ? safeApiYears : [
            {value: '', label: 'Год'},
            {value: '2023', label: '2023'},
            {value: '2022', label: '2022'},
            {value: '2021', label: '2021'}
        ],
        ratings: [
            {value: '', label: 'Рейтинг'},
            {value: '9', label: '9+'},
            {value: '8', label: '8+'},
            {value: '7', label: '7+'}
        ],
        platforms: [
            {value: '', label: 'Платформа'},
            {value: 'netflix', label: 'Netflix'},
            {value: 'disney', label: 'Disney+'},
            {value: 'hbo', label: 'HBO'}
        ],
        genres: safeApiGenres.length > 0 ?
            [{value: '', label: 'Все жанры'}, ...safeApiGenres] :
            [
                {value: '', label: 'Все жанры'},
                {value: 'фэнтези', label: 'Фентези'},
                {value: 'триллер', label: 'Триллер'}
            ],
        countries: safeApiCountries.length > 0 ?
            [{value: '', label: 'Страна'}, ...safeApiCountries] :
            [
                {value: '', label: 'Страна'},
                {value: 'usa', label: 'США'},
                {value: 'russia', label: 'Россия'},
                {value: 'korea', label: 'Корея'}
            ],
        durations: [
            {value: '', label: 'Продолжительность'},
            {value: '90', label: 'До 90 мин'},
            {value: '90-120', label: '90-120 мин'},
            {value: '120', label: '120+ мин'}
        ],
        dates: [
            {value: '', label: 'Дата добавления'},
            {value: 'old', label: 'Старые'},
            {value: 'month', label: 'За месяц'},
            {value: 'year', label: 'За год'}
        ],
        tags: [
            {value: '', label: 'Метки'},
            {value: 'favorite', label: 'Избранное'},
            {value: 'watchlist', label: 'К просмотру'}
        ],
        ages: [
            {value: '', label: '16+'},
            {value: '18', label: '18+'},
            {value: '12', label: '12+'}
        ],
        popularities: [
            {value: '', label: 'Популярность'},
            {value: 'high', label: 'Высокая'},
            {value: 'medium', label: 'Средняя'}
        ]
    }


    const handleResetFilter = (filterName: keyof FilterValues, filterValue?: string) => {
        if (filterName === 'genres' && filterValue) {
            const newGenres = filters.genres?.filter(g => g !== filterValue) || []
            onFilterChange({
                genres: newGenres,
                'genres.name': newGenres.length > 0 ? newGenres : undefined
            })
        } else if (filterName === 'top250') {
            onFilterChange({
                top250: false,
                'top250': undefined
            })
        } else {
            const resetValue = typeof filters[filterName] === 'boolean' ? false :
                filterName === 'year' ? {from: '', to: ''} : ''
            onFilterChange({[filterName]: resetValue})
        }
    }

    const getActiveFilters = () => {
        const activeFilters: {key: keyof FilterValues; label: string; value?: string}[] = [];

        if (filters.year?.from || filters.year?.to) {
            activeFilters.push({
                key: 'year',
                label: `Год: ${filters.year.from || ''}-${filters.year.to || ''}`
            })
        }


        if (filters.genres?.length) {
            filters.genres.forEach(genre => {
                activeFilters.push({
                    key: 'genres',
                    label: `Жанр: ${genre}`,
                    value: genre
                });
            });
        }

        if (filters.top250) {
            activeFilters.push({
                key: 'top250',
                label: 'Топ-250'
            });
        }

        if (filters.rating) {
            const option = ratingOptions.find(opt => opt.value === filters.rating);
            if (option) {
                activeFilters.push({
                    key: 'rating',
                    label: `Рейтинг: ${option.label}`
                });
            }
        }

        if (filters.language) {
            activeFilters.push({
                key: 'language',
                label: `Язык: ${filters.language}`
            });
        }

        if (filters.award) {
            activeFilters.push({
                key: 'award',
                label: `Награда: ${filters.award}`
            });
        }

        if (filters.is3d) {
            activeFilters.push({
                key: 'is3d',
                label: '3D'
            });
        }

        const filterTypes = [
            {key: 'rating', label: 'Рейтинг'},
            {key: 'platform', label: 'Платформа'},
            {key: 'country', label: 'Страна'},
            {key: 'duration', label: 'Продолжительность'},
            {key: 'date', label: 'Дата добавления'},
            {key: 'tag', label: 'Метка'},
            {key: 'age', label: 'Возраст'},
            {key: 'popularity', label: 'Популярность'},
            {key: 'action', label: 'Боевик'},
            {key: 'drama', label: 'Драма'},
            {key: 'comedy', label: 'Комедия'},
            {key: 'horror', label: 'Ужасы'},
            {key: 'universe', label: 'Одна вселенная'},
            {key: 'watched', label: 'Просмотрено'}
        ]

        filterTypes.forEach(({key, label}) => {
            if (filters[key]) {
                if (typeof filters[key] === 'boolean') {
                    activeFilters.push({key, label})
                } else {
                    const option = defaultOptions[key as keyof typeof defaultOptions]
                        ?.find((opt: any) => opt.value === filters[key])
                    if (option) {
                        activeFilters.push({
                            key,
                            label: `${label}: ${option.label}`
                        })
                    }
                }
            }
        })

        return activeFilters
    }

    const handleYearChange = useCallback((range: { from: string; to: string }) => {
        onFilterChange({year: range})
    }, [onFilterChange])



    const handleToggleFilter = (filterName: keyof FilterValues, value: any) => {
        onFilterChange({[filterName]: value})
    }

    const handleUniverseToggle = () => {
        const newValue = !filters.universe;
        onFilterChange({
            universe: newValue,
            'similarMovies.id': newValue ? { $exists: true } : undefined,
            'sequelsAndPrequels.id': newValue ? { $exists: true } : undefined
        });
    };


    const handlePlatformChange = (value: string) => {
        onFilterChange({
            platform: value,
            'watchability.items.name': value || undefined
        });
    };

    const handleAgeChange = (value: string) => {
        onFilterChange({
            age: value,
            ageRating: value ? { $gte: parseInt(value) } : undefined
        });
    };


    const handleRatingChange = (value: string) => {
        if (!value) {
            onFilterChange({
                rating: '',
                'rating.imdb': undefined,
                'rating.kp': undefined
            });
            return;
        }

        const [from] = value.split('-');
        onFilterChange({
            rating: value,
            'rating.imdb': `${from}-10`,
            'rating.kp': `${from}-10`,
            page: 1
        });
    };

    const handleTop250Toggle = () => {
        const newValue = !filters.top250;
        onFilterChange({
            top250: newValue,
            ...(newValue ? {
                year: { from: '', to: '' },
                genres: [],
                rating: ''
            } : {})
        });
    };

    const handleDurationChange = (value: string) => {
        let durationFilter;
        if (value === 'short') durationFilter = { $lt: 90 };
        else if (value === 'medium') durationFilter = { $gte: 90, $lte: 120 };
        else if (value === 'long') durationFilter = { $gt: 120 };
        else if (value) durationFilter = parseInt(value);

        onFilterChange({
            duration: value,
            movieLength: durationFilter
        });
    };

    const handleResetAll = useCallback(() => {
        dispatch(resetFilmFilters());
        onFilterChange({
            genres: [],
            'genres.name': undefined,
            top250: false,
            'top250': undefined,
            year: { from: '', to: '' },
            rating: '',
            'rating.imdb': undefined,
            'rating.kp': undefined,
        });
    }, [dispatch, onFilterChange]);

    const activeFilters = getActiveFilters()



    {genresLoading ? (
        <Spinner className="w-5 h-5" />
    ) : (
        <Select
            options={[{ value: '', label: 'Все жанры' }, ...apiGenres]}
            value=""
            onChange={(value) => handleGenreToggle(value)}
        />
    )}

    return (
        <div
            className={`pt-36 px-16 w-full rounded-lg p-4 space-y-4 border border-transparent bg-clip-padding bg-origin-border before:content-[''] before:absolute before:inset-0 before:rounded-lg before:p-[1px] before:bg-gradient-to-r before:-z-10 relative z-0 ${className}`}>
            {activeFilters.length > 0 && (
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
                    <div className="flex flex-wrap items-center gap-2">
                        {activeFilters.map(({key, label, value}) => (
                            <FilterLabel
                                key={`${key}-${label}`}
                                label={label}
                                onRemove={() => handleResetFilter(key, value)}
                            />
                        ))}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-ghoukie-green transition-colors"
                        onClick={handleResetAll}
                        disabled={activeFilters.length === 0}
                    >
                        <Trash2 size={16} className="mr-1"/>
                        Очистить всё
                    </Button>
                </div>
            )}

            <div className="flex flex-wrap gap-4">
                <div className="flex-1 flex gap-4">
                    <RangeSelect
                        value={filters.year || {from: '', to: ''}}
                        onChange={handleYearChange}
                        label="Год выпуска"
                    />
                    <ButtonToggle
                        label="Просмотрено"
                        active={!!filters.watched}
                        onClick={() => handleToggleFilter('watched', !filters.watched)}
                    />
                    <Select
                        options={ratingOptions}
                        value={filters.rating || ''}
                        onChange={handleRatingChange}
                    />
                </div>

                <div className="flex flex-wrap gap-1 flex-1">
                    <ButtonToggle
                        label="Боевик"
                        active={filters.genres?.includes('боевик')}
                        onClick={() => handleGenreToggle('боевик')}
                    />
                    <ButtonToggle
                        label="Драма"
                        active={filters.genres?.includes('драма')}
                        onClick={() => handleGenreToggle('драма')}
                    />
                    <ButtonToggle
                        label="Комедия"
                        active={filters.genres?.includes('<комедия')}
                        onClick={() => handleGenreToggle('комедия')}
                    />
                    <ButtonToggle
                        label="Ужасы"
                        active={filters.genres?.includes('<ужасы')}
                        onClick={() => handleGenreToggle('ужасы')}
                    />
                </div>

                <div className="flex-1 flex gap-4 min-w-[240px]">
                    <Select
                        options={[
                            { value: '', label: 'Все жанры' },
                            ...apiGenres
                        ]}
                        value=""
                        onChange={handleGenreToggle}
                    />
                    <ButtonToggle
                        label="Топ-250"
                        active={!!filters.top250}
                        onClick={handleTop250Toggle}
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                <div className="flex-1 flex gap-4 min-w-[240px]">
                    <Select
                        options={[{value: '', label: 'Платформа'}, ]}
                        value={filters.platform || ''}
                        onChange={handlePlatformChange}
                    />
                    <Select
                        options={[
                            {value: '', label: 'Возраст'},
                            {value: '6', label: '6+'},
                            {value: '12', label: '12+'},
                            {value: '16', label: '16+'},
                            {value: '18', label: '18+'}
                        ]}
                        value={filters.age || ''}
                        onChange={handleAgeChange}
                    />
                    <Select
                        options={defaultOptions.popularities}
                        value={filters.popularity || ''}
                        onChange={(value) => handleToggleFilter('popularity', value)}
                    />
                </div>

                <div className="flex-1 flex gap-4 min-w-[240px]">
                    <Select
                        options={durations.length ? [{
                            value: '',
                            label: 'Продолжительность'
                        }, ...durations] : defaultOptions.durations}
                        value={filters.duration || ''}
                        onChange={(value) => handleToggleFilter('duration', value)}
                    />
                    <Select
                        options={dates.length ? [{
                            value: '',
                            label: 'Дата добавления'
                        }, ...dates] : defaultOptions.dates}
                        value={filters.date || ''}
                        onChange={(value) => handleToggleFilter('date', value)}
                    />
                </div>

                <div className="flex-1 flex gap-4 min-w-[240px]">
                    <Select
                        options={tags.length ? [{value: '', label: 'Метки'}, ...tags] : defaultOptions.tags}
                        value={filters.tag || ''}
                        onChange={(value) => handleToggleFilter('tag', value)}
                    />
                    <Select
                        options={countries.length ? [{
                            value: '',
                            label: 'Страна'
                        }, ...countries] : defaultOptions.countries}
                        value={filters.country || ''}
                        onChange={(value) => handleToggleFilter('country', value)}
                    />
                </div>
            </div>
            <Collapse isOpen={isExpanded}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {/* Язык оригинала */}
                    <Select
                        options={[
                            {value: '', label: 'Язык оригинала'},
                            {value: 'ru', label: 'Русский'},
                            {value: 'en', label: 'Английский'},
                            {value: 'ja', label: 'Японский'}
                        ]}
                        value={filters.language || ''}
                        onChange={(value) => onFilterChange({
                            language: value,
                            'names.language': value || undefined,
                            page: 1
                        })}
                    />

                    <Select
                        options={[
                            {value: '', label: 'Награды'},
                            {value: 'oscar', label: 'Оскар'},
                            {value: 'golden-globe', label: 'Золотой глобус'}
                        ]}
                        value={filters.award || ''}
                        onChange={(value) => onFilterChange({
                            award: value,
                            'awards.name': value || undefined,
                            page: 1
                        })}
                    />

                    <Select
                        options={[
                            {value: '', label: 'Студия'},
                            {value: 'marvel', label: 'Marvel Studios'},
                            {value: 'warner', label: 'Warner Bros.'},
                            {value: 'universal', label: 'Universal Pictures'}
                        ]}
                        value={filters.studio || ''}
                        onChange={(value) => onFilterChange({
                            studio: value,
                            'productionCompanies.name': value || undefined,
                            page: 1
                        })}
                    />

                    <SearchInput
                        placeholder="Актеры"
                        onSearch={(value) => onFilterChange({
                            actor: value,
                            'persons.name': value,
                            'persons.enProfession': 'actor',
                            page: 1
                        })}
                    />

                    <SearchInput
                        placeholder="Режиссеры"
                        onSearch={(value) => onFilterChange({
                            director: value,
                            'persons.name': value,
                            'persons.enProfession': 'director',
                            page: 1
                        })}
                    />

                    <SearchInput
                        placeholder="Операторы"
                        onSearch={(value) => onFilterChange({
                            operator: value,
                            'persons.name': value,
                            'persons.enProfession': 'operator',
                            page: 1
                        })}
                    />

                    <ButtonToggle
                        label="3D"
                        active={!!filters.is3d}
                        onClick={() => onFilterChange({
                            is3d: !filters.is3d,
                            page: 1
                        })}
                    />

                    {/* IMAX */}
                    <ButtonToggle
                        label="IMAX"
                        active={!!filters.isImax}
                        onClick={() => onFilterChange({
                            isImax: !filters.isImax,
                            page: 1
                        })}
                    />
                </div>
            </Collapse>

            <div className="flex items-center justify-between mt-4">
                <Button
                    variant="ghost"
                    size="ghost"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-black hover:bg-transparent hover:text-ghoukie-light-green gap-2"
                >
                    {isExpanded ? 'Скрыть фильтры' : 'Все фильтры'}
                    <ChevronDown className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}/>
                </Button>

                <Button
                    onClick={onApplyFilters}
                    disabled={isLoadingPreview || previewCount === null}
                    className="bg-ghoukie-green hover:bg-ghoukie-dark-green text-white min-w-[120px]"
                >
                    {isLoadingPreview ? (
                        <Spinner className="w-4 h-4"/>
                    ) : previewCount !== null ? (
                        `Показать ${previewCount}`
                    ) : (
                        'Применить'
                    )}
                </Button>
            </div>
        </div>
    )
}