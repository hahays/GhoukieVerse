'use client';
import React, {useCallback, useState} from 'react';
import {Button} from '../../../../components/ui/Button';
import {ButtonToggle} from '../../../../components/ui/ButtonToggle/ButtonToggle';
import {Select} from '../../../../components/ui/Select/Select';
import {FilterPanelCore} from './FilterPanelCore';
import {CheckboxSelect} from "../../../../components/ui/CheckBoxSelect/CheckBoxSelect";
import {Chip} from "../../../../components/ui/Chip/Chip";
import {SearchInput} from "../../../../components/ui/SearchInput/SearchInput";


const mockPlatforms = [
    {value: 'netflix', label: 'Netflix'},
    {value: 'disney', label: 'Disney+'},
    {value: 'hbo', label: 'HBO'},
];

const mockAgeRatings = [
    {value: '18', label: '18+'},
    {value: '16', label: '16+'},
    {value: '12', label: '12+'},
];

export const FilterPanelMobile = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <FilterPanelCore>
            {({filters, update, reset}) => {
                const toggle = () => setIsOpen(o => !o);
                const clearFilters = useCallback(() => reset(), [reset]);

                const handleGenreToggle = (genre: string) => {
                    const current = filters.genres || [];
                    const next = current.includes(genre)
                        ? current.filter(g => g !== genre)
                        : [...current, genre];
                    update({genres: next});
                };

                return (
                    <div className="pt-36 px-16 font-victor">
                        <div className="lg:hidden">
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    onClick={toggle}
                                    className="flex items-center gap-2 px-3 py-2"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M4 6H20M4 12H20M4 18H20"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    Фильтры
                                </Button>
                                <span className="text-sm text-gray-500">5, 40329 фильмов</span>
                            </div>

                            {isOpen && (
                                <div className="fixed inset-0 bg-ghoukie-white z-50 p-4 overflow-y-auto">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-bold">Фильтр поиска</h2>
                                        <button onClick={toggle} className="text-gray-500 text-2xl">
                                            ✕
                                        </button>
                                    </div>
                                    <div
                                        className="h-px bg-gradient-to-r from-ghoukie-green to-ghoukie-black mb-6"></div>

                                    <div className="space-y-6">
                                        <div className="flex gap-2">
                                            <ButtonToggle
                                                textSize="lg"
                                                variant={filters.top250 ? 'default' : 'outline'}
                                                onClick={() => update({top250: !filters.top250})}
                                            >
                                                Топ-250
                                            </ButtonToggle>
                                            <ButtonToggle
                                                variant={filters.watched ? 'default' : 'outline'}
                                                onClick={() => update({watched: !filters.watched})}
                                            >
                                                Просмотрено
                                            </ButtonToggle>
                                        </div>

                                        <Select label="Год" options={[{value: '', label: 'Год'}]} onSelect={() => {
                                        }}/>

                                        <div className="flex gap-2">
                                            <ButtonToggle
                                                variant={filters.genres?.includes('боевик') ? 'default' : 'outline'}
                                                onClick={() => handleGenreToggle('боевик')}
                                            >
                                                Боевик
                                            </ButtonToggle>
                                            <Select label="Метки" options={[{value: '', label: 'Метки'}]}
                                                    onSelect={() => {
                                                    }}/>
                                        </div>

                                        <div className="flex gap-2">
                                            <Select label="Страна" options={[{value: '', label: 'Страна'}]}
                                                    onSelect={() => {
                                                    }}/>
                                            <ButtonToggle
                                                variant={filters.genres?.includes('драма') ? 'default' : 'outline'}
                                                onClick={() => handleGenreToggle('драма')}
                                            >
                                                Драма
                                            </ButtonToggle>
                                        </div>

                                        <div className="flex gap-2">
                                            <ButtonToggle
                                                variant={filters.genres?.includes('комедия') ? 'default' : 'outline'}
                                                onClick={() => handleGenreToggle('комедия')}
                                            >
                                                Комедия
                                            </ButtonToggle>
                                            <Select label="Рейтинг" options={[{value: '', label: 'Рейтинг'}]}
                                                    onSelect={() => {
                                                    }}/>
                                        </div>

                                        <div className="flex gap-2">
                                            <Select label="Студия" options={[{value: '', label: 'Студия'}]}
                                                    onSelect={() => {
                                                    }}/>
                                            <ButtonToggle
                                                variant={filters.genres?.includes('ужасы') ? 'default' : 'outline'}
                                                onClick={() => handleGenreToggle('ужасы')}
                                            >
                                                Ужасы
                                            </ButtonToggle>
                                        </div>

                                        <SearchInput label="Актер" options={[]} onSelect={() => {
                                        }}/>

                                        <CheckboxSelect
                                            label="Платформа"
                                            options={mockPlatforms}
                                            selected={filters.platform ? [filters.platform] : []}
                                            onChange={val => update({platform: val[0] || ''})}
                                        />

                                        <SearchInput label="Режиссер" options={[]} onSelect={() => {
                                        }}/>

                                        <Select label="Все жанры" options={[{value: '', label: 'Все жанры'}]}
                                                onSelect={() => {
                                                }}/>

                                        <Select label="Продолжительность"
                                                options={[{value: '', label: 'Продолжительность'}]} onSelect={() => {
                                        }}/>

                                        <Select label="Дата добавления"
                                                options={[{value: '', label: 'Дата добавления'}]} onSelect={() => {
                                        }}/>

                                        <div className="flex gap-2">
                                            <ButtonToggle
                                                variant={filters.isImax ? 'default' : 'outline'}
                                                onClick={() => update({isImax: !filters.isImax})}
                                            >
                                                IMAX
                                            </ButtonToggle>
                                            <Select label="Награды" options={[{value: '', label: 'Награды'}]}
                                                    onSelect={() => {
                                                    }}/>
                                        </div>

                                        <div className="flex gap-2">
                                            <Select label="Страна" options={[{value: '', label: 'Страна'}]}
                                                    onSelect={() => {
                                                    }}/>
                                            <ButtonToggle
                                                variant={filters.is3d ? 'default' : 'outline'}
                                                onClick={() => update({is3d: !filters.is3d})}
                                            >
                                                3D
                                            </ButtonToggle>
                                        </div>

                                        <CheckboxSelect
                                            label="Возрастной рейтинг"
                                            options={mockAgeRatings}
                                            selected={filters.age ? [filters.age] : []}
                                            onChange={val => update({age: val[0] || ''})}
                                        />

                                        <Select label="Бюджет" options={[{value: '', label: 'Бюджет'}]}
                                                onSelect={() => {
                                                }}/>

                                        <Select label="Популярность" options={[{value: '', label: 'Популярность'}]}
                                                onSelect={() => {
                                                }}/>

                                        <SearchInput label="Оператор" options={[]} onSelect={() => {
                                        }}/>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <Chip label="Смотрел"/>
                                            <Chip label="16+"/>
                                            <Chip label="Бюджет"/>
                                        </div>

                                        <Button variant="outline" onClick={clearFilters} className="flex-1" fullWidth>
                                            Очистить фильтр
                                        </Button>

                                        <Button onClick={toggle} className="flex-1" fullWidth>
                                            Применить
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            }}
        </FilterPanelCore>
    );
};