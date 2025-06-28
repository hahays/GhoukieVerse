import React, {useCallback, useState} from 'react'
import {Select} from '../Select/Select'
import {ButtonToggle} from '../ButtonToggle/ButtonToggle'
import {Button} from '../Button'
import {RangeSelect} from '../RangeSelect/RangeSelect'
import {Trash2} from 'lucide-react'

import {FilterLabel} from "../FilterLabel/FilterLabel";
import {FilterValues} from "../../../types/film";
import {FilterPanelProps} from "./types";
import {useAppDispatch, useAppSelector} from "../../../stores/hooks";
import {resetFilmFilters, setFilmFilter} from "../../../stores/slices/films/filmFilters.slice";

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
                                onYearChange,
                                onGenreChange,
                            }: FilterPanelProps) => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector(state => state.filmFilters);
    const [isExpanded, setIsExpanded] = useState(false);

    const defaultOptions = {
        years: [
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
        genres: [
            {value: '', label: 'Все жанры'},
            {value: 'fantasy', label: 'Фантастика'},
            {value: 'thriller', label: 'Триллер'}
        ],
        countries: [
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


    const handleResetFilter = (filterName: keyof FilterValues) => {
        const resetValue = typeof filters[filterName] === 'boolean' ? false :
            filterName === 'year' ? {from: '', to: ''} : ''
        handleFilterChange(filterName, resetValue)
    }


    const getActiveFilters = () => {
        const activeFilters: { key: keyof FilterValues; label: string }[] = []

        if (filters.year.from || filters.year.to) {
            activeFilters.push({
                key: 'year',
                label: `Год: ${filters.year.from || ''}-${filters.year.to || ''}`
            })
        }

        const booleanFilters = [
            {key: 'action', label: 'Боевик'},
            {key: 'drama', label: 'Драма'},
            {key: 'comedy', label: 'Комедия'},
            {key: 'horror', label: 'Ужасы'},
            {key: 'universe', label: 'Одна вселенная'},
            {key: 'watched', label: 'Просмотрено'}
        ]

        booleanFilters.forEach(({key, label}) => {
            if (filters[key]) {
                activeFilters.push({key, label})
            }
        })
        const textFilters = [
            {key: 'rating', label: 'Рейтинг'},
            {key: 'platform', label: 'Платформа'},
            {key: 'genre', label: 'Жанр'},
            {key: 'country', label: 'Страна'},
            {key: 'duration', label: 'Продолжительность'},
            {key: 'date', label: 'Дата добавления'},
            {key: 'tag', label: 'Метка'},
            {key: 'age', label: 'Возраст'},
            {key: 'popularity', label: 'Популярность'}
        ]

        textFilters.forEach(({key, label}) => {
            if (filters[key]) {
                const option = defaultOptions[key as keyof typeof defaultOptions]
                    .find((opt: any) => opt.value === filters[key])
                if (option) {
                    activeFilters.push({key, label: `${label}: ${option.label}`})
                }
            }
        })

        return activeFilters
    }

    const handleActionToggle = () => {
        const newValue = !filters.action;
        dispatch(setFilmFilter({ action: newValue }));

        console.log('Боевик фильтр:', newValue);
    };

    const handleYearChange = useCallback((range: { from: string; to: string }) => {
        dispatch(setFilmFilter({year: range}));
    }, [dispatch]);

    const handleGenreChange = useCallback((genre: string) => {
        dispatch(setFilmFilter({genre}));
    }, [dispatch]);

    const handleToggleFilter = useCallback((filterName: keyof FilterValues, value: any) => {
        dispatch(setFilmFilter({[filterName]: value}));
    }, [dispatch]);

    const handleResetAll = useCallback(() => {
        dispatch(resetFilmFilters());
    }, [dispatch]);


    const activeFilters = getActiveFilters()

    return (
        <div
            className={`pt-36 px-16 w-full rounded-lg p-4 space-y-4 border border-transparent bg-clip-padding bg-origin-border before:content-[''] before:absolute before:inset-0 before:rounded-lg before:p-[1px] before:bg-gradient-to-r before:-z-10 relative z-0 ${className}`}>
            {activeFilters.length > 0 && (
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
                    <div className="flex flex-wrap items-center gap-2">
                        {activeFilters.map(({key, label}) => (
                            <FilterLabel
                                key={key}
                                label={label}
                                onRemove={() => handleResetFilter(key)}
                            />
                        ))}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-ghoukie-green"
                        onClick={handleResetAll}
                    >
                        <Trash2 size={16} className="mr-1"/>
                        Очистить всё
                    </Button>
                </div>
            )}

            <div className="flex flex-wrap gap-4">
                <div className="flex-1 flex gap-4">
                    <RangeSelect
                        value={filters.year}
                        onChange={handleYearChange}
                        label="Год выпуска"
                    />
                    <ButtonToggle
                        label="Просмотрено"
                        active={filters.watched}
                        onClick={() => handleFilterChange('watched', !filters.watched)}
                    />
                    <Select
                        options={ratings.length ? [{value: '', label: 'Рейтинг'}, ...ratings] : defaultOptions.ratings}
                        value={filters.rating}
                        onChange={(value) => handleFilterChange('rating', value)}
                    />
                </div>

                <div className="flex flex-wrap gap-1 flex-1">
                    <ButtonToggle
                        label="Боевик"
                        active={filters.action}
                        onClick={handleActionToggle}
                    />
                    <ButtonToggle
                        label="Драма"
                        active={filters.drama}
                        onClick={() => handleFilterChange('drama', !filters.drama)}
                    />
                    <ButtonToggle
                        label="Комедия"
                        active={filters.comedy}
                        onClick={() => handleFilterChange('comedy', !filters.comedy)}
                    />
                    <ButtonToggle
                        label="Ужасы"
                        active={filters.horror}
                        onClick={() => handleFilterChange('horror', !filters.horror)}
                    />
                </div>

                <div className="flex-1 flex gap-4 min-w-[240px]">
                    <Select
                        options={genres}
                        value={filters.genre}
                        onChange={handleGenreChange}
                    />
                    <ButtonToggle
                        label="Одна вселенная"
                        active={filters.universe}
                        onClick={() => handleFilterChange('universe', !filters.universe)}
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                <div className="flex-1 flex gap-4 min-w-[240px]">
                    <Select
                        options={platforms.length ? [{
                            value: '',
                            label: 'Платформа'
                        }, ...platforms] : defaultOptions.platforms}
                        value={filters.platform}
                        onChange={(value) => handleFilterChange('platform', value)}
                    />
                    <Select
                        options={defaultOptions.ages}
                        value={filters.age}
                        onChange={(value) => handleFilterChange('age', value)}
                    />
                    <Select
                        options={defaultOptions.popularities}
                        value={filters.popularity}
                        onChange={(value) => handleFilterChange('popularity', value)}
                    />
                </div>

                <div className="flex-1 flex gap-4 min-w-[240px]">
                    <Select
                        options={durations.length ? [{
                            value: '',
                            label: 'Продолжительность'
                        }, ...durations] : defaultOptions.durations}
                        value={filters.duration}
                        onChange={(value) => handleFilterChange('duration', value)}
                    />
                    <Select
                        options={dates.length ? [{
                            value: '',
                            label: 'Дата добавления'
                        }, ...dates] : defaultOptions.dates}
                        value={filters.date}
                        onChange={(value) => handleFilterChange('date', value)}
                    />
                </div>

                <div className="flex-1 flex gap-4 min-w-[240px]">
                    <Select
                        options={tags.length ? [{value: '', label: 'Метки'}, ...tags] : defaultOptions.tags}
                        value={filters.tag}
                        onChange={(value) => handleFilterChange('tag', value)}
                    />
                    <Select
                        options={countries.length ? [{
                            value: '',
                            label: 'Страна'
                        }, ...countries] : defaultOptions.countries}
                        value={filters.country}
                        onChange={(value) => handleFilterChange('country', value)}
                    />
                </div>
            </div>

            <div className="flex">
                <Button
                    variant="ghost"
                    size="ghost"
                    className="text-black hover:bg-transparent hover:text-ghoukie-light-green gap-2"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? 'Скрыть' : 'Показать все'}
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    >
                        <path
                            d="M6 9L12 15L18 9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Button>
            </div>
        </div>
    )
}