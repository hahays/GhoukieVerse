import {useState} from 'react';
import {Button} from '../../components/ui/Button';
import {Select} from "../../components/ui/Select/Select";
import {CheckboxSelect, mockAgeRatings, mockPlatforms} from "../../components/ui/CheckBoxSelect/CheckBoxSelect";
import {ButtonToggle} from "../../components/ui/ButtonToggle/ButtonToggle";
import {SearchInput} from "../../components/ui/SearchInput/SearchInput";
import {Chip} from "../../components/ui/Chip/Chip";

export const FilterPanelMobile = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Amazon']);
    const [selectedAge, setSelectedAge] = useState<string[]>(['16']);

    const toggleFilter = () => setIsOpen(!isOpen);
    const clearFilters = () => {
        setSelectedGenres([]);
        setSelectedCountries([]);
        setSelectedPlatforms([]);
        setSelectedAge([]);
    };

    return (
        <div className="pt-36 px-16 font-victor">

            <div className="lg:hidden">
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={toggleFilter}
                        className="flex items-center gap-2 px-3 py-2"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"/>
                        </svg>
                        Фильтры
                    </Button>
                    <span className="text-sm text-gray-500"> 5, 40329 фильмов</span>
                </div>

                {isOpen && (
                    <div className="fixed inset-0 bg-ghoukie-white z-50 p-4 overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Фильтр поиска</h2>
                            <button onClick={toggleFilter} className="text-gray-500 text-2xl">
                                ✕
                            </button>
                        </div>
                        <div className="h-px bg-gradient-to-r from-ghoukie-green to-ghoukie-black mb-6"></div>
                        <div className="space-y-6">
                            <div className="flex gap-2">
                                <ButtonToggle textSize="lg" variant={selectedGenres.includes('top250') ? 'default' : 'outline'}>
                                    Топ-250
                                </ButtonToggle>
                                <ButtonToggle variant={selectedGenres.includes('watched') ? 'default' : 'outline'}>
                                    Просмотрено
                                </ButtonToggle>
                            </div>

                            <Select
                                label="Год"
                                options={[`Год`]}
                                onSelect={() => {
                                }}
                            />

                            <div className="flex gap-2">
                                <ButtonToggle variant={selectedGenres.includes('top250') ? 'default' : 'outline'}>
                                    Боевик
                                </ButtonToggle>
                                <Select
                                    label="Метки"
                                    options={[`Метки`]}
                                    onSelect={() => {
                                    }}
                                />
                            </div>

                            <div className="flex gap-2">
                                <Select
                                    label="Страна"
                                    options={[`Страна`]}
                                    onSelect={() => {
                                    }}
                                />
                                <ButtonToggle variant={selectedGenres.includes('top250') ? 'default' : 'outline'}>
                                    Драма
                                </ButtonToggle>

                            </div>
                            <div className="flex gap-2">
                                <ButtonToggle variant={selectedGenres.includes('top250') ? 'default' : 'outline'}>
                                    Комедия
                                </ButtonToggle>
                                <Select
                                    label="Рейтинг"
                                    options={[`Рейтинг`]}
                                    onSelect={() => {
                                    }}
                                />
                            </div>

                            <div className="flex gap-2">
                                <Select
                                    label="Студия"
                                    options={[`Студия`]}
                                    onSelect={() => {
                                    }}
                                />
                                <ButtonToggle variant={selectedGenres.includes('top250') ? 'default' : 'outline'}>
                                    Ужасы
                                </ButtonToggle>
                            </div>

                            <SearchInput
                                label="Актер"
                                options={[]}
                                onSelect={() => {
                                }}
                            />

                            <CheckboxSelect
                                label="Платформа"
                                options={mockPlatforms}
                                selected={selectedPlatforms}
                                onChange={setSelectedPlatforms}
                            />

                            <SearchInput
                                label="Режиссер"
                                options={[]}
                                onSelect={() => {
                                }}
                            />

                            <Select
                                label="Все жанры"
                                options={[`Все Жанры`]}
                                onSelect={() => {
                                }}
                            />

                            <Select
                                label="Продолжительность"
                                options={[`Продолжительность`]}
                                onSelect={() => {
                                }}
                            />

                            <Select
                                label="Дата добавления"
                                options={[`Дата добавления`]}
                                onSelect={() => {
                                }}
                            />

                            <div className="flex gap-2">
                                <ButtonToggle variant={selectedGenres.includes('top250') ? 'default' : 'outline'}>
                                    IMAX
                                </ButtonToggle>
                                <Select
                                    label="Награды"
                                    options={[`Награды`]}
                                    onSelect={() => {
                                    }}
                                />
                            </div>
                            <div className="flex gap-2">
                                <Select
                                    label="Страна"
                                    options={[`Страна`]}
                                    onSelect={() => {
                                    }}
                                />
                                <ButtonToggle variant={selectedGenres.includes('top250') ? 'default' : 'outline'}>
                                    3D
                                </ButtonToggle>
                            </div>

                            <CheckboxSelect
                                label="Возрастной рейтинг"
                                options={mockAgeRatings}
                                selected={selectedAge}
                                onChange={setSelectedAge}
                            />

                            <Select
                                label="Бюджет"
                                options={[`Бюджет`]}
                                onSelect={() => {
                                }}
                            />

                            <Select
                                label="Популярность"
                                options={[`Популярность`]}
                                onSelect={() => {
                                }}
                            />

                            <SearchInput
                                label="Оператор"
                                options={[]}
                                onSelect={() => {
                                }}
                            />

                            <div className="flex flex-wrap gap-2 mb-4">
                               <Chip label="Смотрел"/>
                                <Chip label="16+"/>
                                <Chip label="Бюджет"/>


                            </div>
                            <Button
                                variant="outline"
                                onClick={clearFilters}
                                className="flex-1"
                                fullWidth={true}
                            >
                                Очистить фильтр
                            </Button>

                            <Button
                                onClick={toggleFilter}
                                className="flex-1"
                                fullWidth={true}
                            >
                                Применить
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                            </div>
                            <div className="flex gap-4 pt-4">
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};