import {useCallback, useState} from "react";
import {FilterPanelProps} from "./types";
import {Select} from "../Select/Select";
import {ButtonToggle} from "../ButtonToggle/ButtonToggle";
import {Button} from "../Button";

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
                            }: FilterPanelProps) => {
    const [filters, setFilters] = useState({
        watched: false,
        action: false,
        drama: false,
        comedy: false,
        horror: false,
        universe: false,
        year: '',
        rating: '',
        platform: '',
        genre: '',
        country: '',
        duration: '',
        date: '',
        tag: '',
        age: '',
        popularity: ''
    });

    const [isExpanded, setIsExpanded] = useState(false);

    const handleFilterChange = useCallback((filterName: string, value: any) => {
        const newFilters = {
            ...filters,
            [filterName]: value
        };
        setFilters(newFilters);
        onFilterChange?.(newFilters);
    }, [filters, onFilterChange]);

    const defaultOptions = {
        years: [{value: '', label: 'Год'}, {value: '2023', label: '2023'}, {
            value: '2022',
            label: '2022'
        }, {value: '2021', label: '2021'}],
        ratings: [{value: '', label: 'Рейтинг'}, {value: '9', label: '9+'}, {value: '8', label: '8+'}, {
            value: '7',
            label: '7+'
        }],
        platforms: [{value: '', label: 'Платформа'}, {value: 'netflix', label: 'Netflix'}, {
            value: 'disney',
            label: 'Disney+'
        }, {value: 'hbo', label: 'HBO'}],
        genres: [{value: '', label: 'Все жанры'}, {value: 'fantasy', label: 'Фантастика'}, {
            value: 'thriller',
            label: 'Триллер'
        }],
        countries: [{value: '', label: 'Страна'}, {value: 'usa', label: 'США'}, {
            value: 'russia',
            label: 'Россия'
        }, {value: 'korea', label: 'Корея'}],
        durations: [{value: '', label: 'Продолжительность'}, {value: '90', label: 'До 90 мин'}, {
            value: '90-120',
            label: '90-120 мин'
        }, {value: '120', label: '120+ мин'}],
        dates: [{value: '', label: 'Дата добавления'}, {value: 'old', label: 'Старые'}, {
            value: 'month',
            label: 'За месяц'
        }, {value: 'year', label: 'За год'}],
        tags: [{value: '', label: 'Метки'}, {value: 'favorite', label: 'Избранное'}, {
            value: 'watchlist',
            label: 'К просмотру'
        }],
        ages: [{value: '', label: '16+'}, {value: '18', label: '18+'}, {value: '12', label: '12+'}],
        popularities: [{value: '', label: 'Популярность'}, {value: 'high', label: 'Высокая'}, {
            value: 'medium',
            label: 'Средняя'
        }]
    };

    return (
        <div className={`pt-36 px-16 w-full rounded-lg p-4 space-y-4 border border-transparent
      bg-clip-padding bg-origin-border before:content-[''] before:absolute before:inset-0 
      before:rounded-lg before:p-[1px] before:bg-gradient-to-r before:-z-10 relative z-0 ${className}`}>

            <div className="flex flex-wrap gap-4">
                <div className="flex-1 flex gap-4">
                    <Select
                        options={years.length ? [{value: '', label: 'Год'}, ...years] : defaultOptions.years}
                        value={filters.year}
                        onChange={(value) => handleFilterChange('year', value)}
                    />
                    <ButtonToggle
                        label="Просмотрено"
                        active={filters.watched}
                        onClick={() => handleFilterToggle('watched')}
                    />
                    <Select
                        options={ratings.length ? [{value: '', label: 'Рейтинг'}, ...ratings] : defaultOptions.ratings}
                        value={filters.rating}
                        onChange={(value) => handleFilterToggle('rating', value)}
                    />
                </div>

                <div className="flex flex-wrap gap-1 flex-1">
                    <ButtonToggle
                        label="Боевик"
                        active={filters.action}
                        onClick={() => handleFilterToggle('action')}
                    />
                    <ButtonToggle
                        label="Драма"
                        active={filters.drama}
                        onClick={() => handleFilterToggle('drama')}
                    />
                    <ButtonToggle
                        label="Комедия"
                        active={filters.comedy}
                        onClick={() => handleFilterToggle('comedy')}
                    />
                    <ButtonToggle
                        label="Ужасы"
                        active={filters.horror}
                        onClick={() => handleFilterToggle('horror')}
                    />
                </div>

                <div className="flex-1 flex gap-4 min-w-[240px]">
                    <Select
                        options={genres.length ? [{value: '', label: 'Все жанры'}, ...genres] : defaultOptions.genres}
                        value={filters.genre}
                        onChange={(value) => handleFilterToggle('genre', value)}
                    />
                    <ButtonToggle
                        label="Одна вселенная"
                        active={filters.universe}
                        onClick={() => handleFilterToggle('universe')}
                    />
                </div>
            </div>

            {/* Вторая строка фильтров (показывается всегда) */}
            <div className="flex flex-wrap gap-4">
                <div className="flex-1 flex gap-4 min-w-[240px]">
                    <Select
                        options={platforms.length ? [{
                            value: '',
                            label: 'Платформа'
                        }, ...platforms] : defaultOptions.platforms}
                        value={filters.platform}
                        onChange={(value) => handleFilterToggle('platform', value)}
                    />
                    <Select
                        options={defaultOptions.ages}
                        value={filters.age}
                        onChange={(value) => handleFilterToggle('age', value)}
                    />
                    <Select
                        options={defaultOptions.popularities}
                        value={filters.popularity}
                        onChange={(value) => handleFilterToggle('popularity', value)}
                    />
                </div>

                <div className="flex-1 flex gap-4 min-w-[240px]">
                    <Select
                        options={durations.length ? [{
                            value: '',
                            label: 'Продолжительность'
                        }, ...durations] : defaultOptions.durations}
                        value={filters.duration}
                        onChange={(value) => handleFilterToggle('duration', value)}
                    />
                    <Select
                        options={dates.length ? [{
                            value: '',
                            label: 'Дата добавления'
                        }, ...dates] : defaultOptions.dates}
                        value={filters.date}
                        onChange={(value) => handleFilterToggle('date', value)}
                    />
                </div>

                <div className="flex-1 flex gap-4 min-w-[240px]">
                    <Select
                        options={tags.length ? [{value: '', label: 'Метки'}, ...tags] : defaultOptions.tags}
                        value={filters.tag}
                        onChange={(value) => handleFilterToggle('tag', value)}
                    />
                    <Select
                        options={countries.length ? [{
                            value: '',
                            label: 'Страна'
                        }, ...countries] : defaultOptions.countries}
                        value={filters.country}
                        onChange={(value) => handleFilterToggle('country', value)}
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
    );
};