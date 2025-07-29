'use client';
import React, {useCallback, useState} from 'react';
import {ChevronDown, Trash2} from 'lucide-react';
import {FilterPanelCore} from './FilterPanelCore';
import {RangeSelect} from '../../../../components/ui/RangeSelect/RangeSelect';
import {Select} from '../../../../components/ui/Select/Select';
import {ButtonToggle} from '../../../../components/ui/ButtonToggle/ButtonToggle';
import {SearchInput} from '../../../../components/ui/SearchInput/SearchInput';
import {Collapse} from "../../../../components/ui/Collapse/Collapse";
import {FilterLabel} from "../../../../components/ui/FilterLabel/FilterLabel";
import {Button} from "../../../../components/ui/Button";
import {Spinner} from "../../../../components/ui/Spinner/Spinner";


interface FilterPanelDesktopProps {
    className?: string;
    onApplyFilters: () => void;
    previewCount?: number | null;
    isLoadingPreview?: boolean;
}

export const FilterPanelDesktop = ({
                                       className = '',
                                       onApplyFilters,
                                       previewCount,
                                       isLoadingPreview,
                                   }: FilterPanelDesktopProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <FilterPanelCore>
            {({filters, update, reset, options, genres, studios, platforms, countries}) => {
                const handleYearChange = useCallback(
                    (range: { from: string; to: string }) => update({year: range}),
                    [update]
                );
                const handleGenreToggle = useCallback(
                    (genre: string) => {
                        const current = filters.genres || [];
                        const next = current.includes(genre)
                            ? current.filter(g => g !== genre)
                            : [...current, genre];
                        update({genres: next});
                    },
                    [filters.genres, update]
                );
                const handleRatingChange = useCallback(
                    (val: string) => update({rating: val}),
                    [update]
                );
                const handleStudioChange = useCallback(
                    (val: string) => update({studio: val}),
                    [update]
                );
                const handlePlatformChange = useCallback(
                    (val: string) => update({platform: val}),
                    [update]
                );
                const handleTop250Toggle = useCallback(
                    () => update({top250: !filters.top250}),
                    [filters.top250, update]
                );
                const handleResetAll = useCallback(() => reset(), [reset]);

                const activeFilters = [
                    ...(filters.year?.from || filters.year?.to
                        ? [{key: 'year' as const, label: `Год: ${filters.year.from}-${filters.year.to}`}]
                        : []),
                    ...(filters.genres?.map(g => ({key: 'genres' as const, label: `Жанр: ${g}`, value: g})) || []),
                    ...(filters.top250 ? [{key: 'top250' as const, label: 'Топ-250'}] : []),
                    ...(filters.rating ? [{key: 'rating' as const, label: `Рейтинг: ${filters.rating}`}] : []),
                    ...(filters.studio ? [{
                        key: 'studio' as const,
                        label: `Студия: ${filters.studio}`,
                        value: filters.studio
                    }] : []),
                ];

                return (
                    <div
                        className={`pt-36 px-4 md:px-16 w-full rounded-lg p-4 space-y-4 border border-transparent bg-clip-padding bg-origin-border before:content-[''] before:absolute before:inset-0 before:rounded-lg before:p-[1px] before:bg-gradient-to-r before:-z-10 relative z-0 ${className}`}
                    >
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-1/3">
                                <RangeSelect value={filters.year || {from: '', to: ''}} onChange={handleYearChange}
                                             label="Год выпуска"/>
                                <ButtonToggle textSize="lg" label="Просмотрено" active={!!filters.watched}
                                              onClick={() => update({watched: !filters.watched})}/>
                                <Select options={options.rating} value={filters.rating || ''}
                                        onChange={handleRatingChange}/>
                            </div>
                            <div className="flex-1 flex gap-2 justify-center min-w-[240px]">
                                {['боевик', 'драма', 'комедия', 'ужасы'].map(g => (
                                    <ButtonToggle key={g} label={g.charAt(0).toUpperCase() + g.slice(1)}
                                                  active={filters.genres?.includes(g)}
                                                  onClick={() => handleGenreToggle(g)}/>
                                ))}
                            </div>
                            <div className="flex-1 flex gap-4 min-w-[240px] justify-end">
                                <div className="w-[65%]">
                                    <Select options={[{value: '', label: 'Все жанры'}, ...genres]} value=""
                                            onChange={handleGenreToggle}/>
                                </div>
                                <div className="w-[45%]">
                                    <ButtonToggle label="Топ-250" active={!!filters.top250}
                                                  onClick={handleTop250Toggle}/>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex-1 flex gap-2 min-w-[240px]">
                                <div className="w-[30%] min-w-[100px]">
                                    <Select options={[{value: '', label: 'Платформа'}, ...platforms]}
                                            value={filters.platform || ''} onChange={handlePlatformChange}/>
                                </div>
                                <div className="w-[30%] min-w-[100px]">
                                    <Select
                                        options={[
                                            {value: '', label: 'Дата добавления'},
                                            {value: '01.01.2024-31.12.2024', label: 'За 2024'},
                                            {value: '01.01.2025-31.12.2025', label: 'За 2025'},
                                            {value: 'last-month', label: 'Последний месяц'},
                                        ]}
                                        value={filters.date || ''}
                                        onChange={v => update({date: v})}
                                    />
                                </div>
                                <div className="w-[40%] min-w-[120px]">
                                    <SearchInput
                                        placeholder="Актер"
                                        onSearch={v =>
                                            update({
                                                actor: v,
                                                'persons.name': v,
                                                'persons.enProfession': 'actor',
                                                page: 1,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex-1 flex gap-4 min-w-[240px] justify-center">
                                <Select
                                    options={[
                                        {value: '', label: 'Продолжительность'},
                                        {value: '30-60', label: '30-60 мин'},
                                        {value: '60-120', label: '60-120 мин'},
                                        {value: '120-180', label: '120-180 мин'},
                                    ]}
                                    value={filters.movieLength || ''}
                                    onChange={v => update({movieLength: v || undefined})}
                                />
                                <Select options={options.type} value={filters.type || ''}
                                        onChange={v => update({type: v})}/>
                            </div>
                            <div className="flex-1 flex gap-4 min-w-[240px] justify-end">
                                <Select options={[{value: '', label: 'Метки'}, {value: 'favorite', label: 'Избранное'}]}
                                        value={filters.tag || ''} onChange={v => update({tag: v})}/>
                                <Select options={[{value: '', label: 'Все страны'}, ...countries]}
                                        value={filters.countries?.[0] || ''}
                                        onChange={v => update({countries: v ? [v] : []})}/>
                            </div>
                        </div>

                        <Collapse isOpen={isExpanded}>
                            <div className="flex flex-wrap gap-4 mt-4">
                                <div className="flex-1 flex gap-4 min-w-[240px]">
                                    <ButtonToggle label="3D" active={!!filters.is3d}
                                                  onClick={() => update({is3d: !filters.is3d})}/>
                                    <Select options={options.awards} value={filters.award || ''}
                                            onChange={v => update({award: v})}/>
                                    <Select
                                        options={[
                                            {value: '', label: 'Язык оригинала'},
                                            {value: 'ru', label: 'Русский'},
                                            {value: 'en', label: 'Английский'},
                                            {value: 'ja', label: 'Японский'},
                                        ]}
                                        value={filters.language || ''}
                                        onChange={v =>
                                            update({
                                                language: v,
                                                'names.language': v || undefined,
                                                page: 1,
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex-1 flex gap-4 min-w-[240px] justify-center">
                                    <Select options={options.popularity} value={filters.popularity || ''}
                                            onChange={v => update({popularity: v})}/>
                                    <SearchInput
                                        placeholder="Режиссер"
                                        onSearch={v =>
                                            update({
                                                director: v,
                                                'persons.name': v,
                                                'persons.enProfession': 'director',
                                                page: 1,
                                            })
                                        }
                                    />
                                    <RangeSelect
                                        label="Бюджет, $"
                                        value={filters.budget || {from: '', to: ''}}
                                        onChange={range => update({budget: range})}
                                    />
                                </div>
                                <div className="flex-1 flex gap-4 min-w-[240px] justify-end">
                                    <SearchInput
                                        placeholder="Оператор"
                                        onSearch={v =>
                                            update({
                                                operator: v,
                                                'persons.name': v,
                                                'persons.enProfession': 'operator',
                                                page: 1,
                                            })
                                        }
                                    />
                                    <ButtonToggle label="IMAX" active={!!filters.isImax}
                                                  onClick={() => update({isImax: !filters.isImax})}/>
                                    <Select options={options.ages} value={filters.age || ''}
                                            onChange={v => update({age: v})}/>
                                </div>
                            </div>
                        </Collapse>

                        {activeFilters.length > 0 && (
                            <div
                                className="flex flex-wrap items-center justify-between gap-2 p-2 bg-gray-50 rounded-lg">
                                <div className="flex flex-wrap items-center gap-2">
                                    {activeFilters.map(({key, label}) => (
                                        <FilterLabel key={key} label={label}
                                                     onRemove={() => update({[key]: undefined})}/>
                                    ))}
                                </div>
                                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-ghoukie-green"
                                        onClick={handleResetAll}>
                                    <Trash2 size={16} className="mr-1"/>
                                    Очистить всё
                                </Button>
                            </div>
                        )}

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
                );
            }}
        </FilterPanelCore>
    );
};