'use client'

import React, {useState} from 'react';
import {MediaGrid} from "../../../components/ui/MediaGrid/MediaGrid";

import {Select} from "../../../components/ui/Select/Select";
import {ButtonToggle} from "../../../components/ui/ButtonToggle/ButtonToggle";
import {Button} from "../../../components/ui/Button";
import {useMovies} from "../../../hooks/useMovies";
import {Pagination} from "../../../components/ui/Pagination/Pagination";


export const FilterPanel = () => {

    const [watched, setWatched] = useState(false);
    const [action, setAction] = useState(false);
    const [drama, setDrama] = useState(false);
    const [comedy, setComedy] = useState(false);
    const [horror, setHorror] = useState(false);
    const [universe, setUniverse] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className="pt-36 px-16 w-full rounded-lg p-4 space-y-4 border border-transparent
    bg-clip-padding bg-origin-border before:content-[''] before:absolute before:inset-0 before:rounded-lg before:p-[1px] before:bg-gradient-to-r  before:-z-10 relative z-0">

            <div className="flex flex-wrap gap-4">

                <div className="flex-1 flex gap-4 ">
                    <Select options={['Год', '2023', '2022', '2021']}/>
                    <ButtonToggle
                        label="Просмотрено"
                        active={watched}
                        onClick={() => setWatched(!watched)}
                    />
                    <Select options={['Рейтинг', '9+', '8+', '7+']}/>
                </div>


                <div className="flex flex-wrap gap-1 flex-1">
                    <ButtonToggle
                        label="Боевик"
                        active={action}
                        onClick={() => setAction(!action)}

                    />
                    <ButtonToggle
                        label="Драма"
                        active={drama}
                        onClick={() => setDrama(!drama)}
                    />
                    <ButtonToggle
                        label="Комедия"
                        active={comedy}
                        onClick={() => setComedy(!comedy)}
                    />
                    <ButtonToggle
                        label="Ужасы"
                        active={horror}
                        onClick={() => setHorror(!horror)}
                    />
                </div>


                <div className="flex-1 flex  gap-4 min-w-[240px]">
                    <Select options={['Все жанры', 'Фантастика', 'Фэнтези', 'Триллер']}/>
                    <ButtonToggle
                        label="Одна вселенная"
                        active={universe}
                        onClick={() => setUniverse(!universe)}
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-4">

                <div className="flex-1 flex gap-4 min-w-[240px]">
                    <Select options={['Платформа', 'Netflix', 'Disney+', 'HBO']}/>
                    <Select options={['16+', '18+', '12+']}/>
                    <Select options={['Популярность', 'Высокая', 'Средняя']}/>
                </div>


                <div className="flex-1 flex  gap-4 min-w-[240px]">
                    <Select options={['Продолжительность', 'До 90 мин', '90-120 мин', '120+ мин']}/>
                    <Select options={['Дата добавления', 'Старые', 'За месяц', 'За год']}/>
                </div>


                <div className="flex-1 flex  gap-4 min-w-[240px]">
                    <Select options={['Метки', 'Избранное', 'К просмотру']}/>
                    <Select options={['Страна', 'США', 'Россия', 'Корея']}/>
                </div>
            </div>


            <div className="flex">
                <Button
                    variant="ghost"
                    size="ghost"
                    className="text-black hover:bg-transparent hover:text-ghoukie-light-green gap-2"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    Показать все
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


interface FilterToggleProps {
    label: string;
}


export default function FilmsPage() {

    const {movies, isLoading, error, hasMore} = useMovies('action',);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (

        <><>
            <FilterPanel/>
        </>
            <div className="">


                <section className="px-16">
                    <MediaGrid movies={movies} mediaType="films"/>

                </section>

                <Pagination movies={movies} hasMore={hasMore}/>
            </div>
        </>


    )
}