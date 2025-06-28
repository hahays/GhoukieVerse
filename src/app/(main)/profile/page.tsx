'use client'

import {useState} from 'react'
import {ChevronRightIcon, TrashIcon} from 'lucide-react'
import {Tabs} from "../../../components/ui/Tabs/Tabs"
import {RatingDiagram} from "../../../components/films/RatingDiagram"
import {Button} from "../../../components/ui/Button"
import {MovieCard} from "../../../components/cards/MovieCard/MovieCard"
import {ActionToggleGroup} from "../../../components/ui/ActionToggleGroup/ActionToggleGroup"
import Image from "next/image"
import {useWatched} from "../../../hooks/useWatched"
import {useFavorites} from "../../../hooks/useFavorites"

type ContentType = 'films' | 'games' | 'anime'
type ProfileTabType = 'profile' | 'films' | 'favorites' | 'dropped' | 'lists'

export default function ProfilePage() {
    const [activeContentTab, setActiveContentTab] = useState<ContentType>('films')
    const [activeProfileTab, setActiveProfileTab] = useState<ProfileTabType>('profile')

    const {favorites, removeFromFavorites} = useFavorites()
    const {isWatched, toggleWatched, getWatchedItems} = useWatched()


    const recentlyWatchedIds = getWatchedItems('films');
    const recentlyWatched = recentlyWatchedIds
        .map(id => {
            const fromFavorites = favorites.films.find(f => f.id === id);
            return fromFavorites || { id, name: `Фильм #${id}`, rating: {} };
        })
        .slice(0, 4);

    const handleToggleWatched = (id: number) => {
        toggleWatched(id, 'films');
    };

    const handleRemoveFavorite = (id: number, type: ContentType) => {
        removeFromFavorites(id, type)
    }


    const calculateAverageRating = () => {
        const allFilms = [...favorites.films, ...recentlyWatched]
        if (allFilms.length === 0) return 0
        const sum = allFilms.reduce((acc, film) => acc + (film.rating?.kp || 0), 0)
        return sum / allFilms.length
    }

    return (
        <div className="min-h-screen bg-ghoukie-white">

            <div className="mt-28 shadow-figma bg-ghoukie-black h-24 w-full"></div>

            <div className="mx-auto px-16">

                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 my-6">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-ghoukie-green/20 border-2 border-ghoukie-green overflow-hidden">
                                <Image
                                    width={128}
                                    height={128}
                                    src="/images/ava.jpg"
                                    alt="Аватар"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h1 className="text-2xl md:text-3xl font-victor font-bold text-ghoukie-black">
                                Привет, Путешественник!
                            </h1>
                        </div>

                        <div className="w-full md:w-auto">
                            <ActionToggleGroup
                                options={[
                                    {value: 'films', label: 'Фильмы'},
                                    {value: 'games', label: 'Игры'},
                                    {value: 'anime', label: 'Аниме'}
                                ]}
                                initial={activeContentTab}
                                onChange={setActiveContentTab}
                                wrapperClass="w-full"
                                outerBgClass="bg-ghoukie-black px-0 py-0 border-2 border-ghoukie-black rounded-md"
                                buttonVariant="tabs"
                                buttonClassName="px-3 py-2 text-sm md:text-base"
                                innerBgClass="bg-ghoukie-white p-1 rounded flex gap-1"
                                gradientClass="bg-ghoukie-green p-1"
                            />
                        </div>
                    </div>
                </div>


                <div className="border-t-4 border-b-4 border-ghoukie-black py-10 my-6">
                    <Tabs
                        items={[
                            {value: 'profile', label: 'Профиль'},
                            {value: 'films', label: 'Фильмы'},
                            {value: 'favorites', label: 'Любимые'},
                            {value: 'dropped', label: 'Брошено'},
                            {value: 'lists', label: 'Списки'}
                        ]}
                        value={activeProfileTab}
                        onChange={setActiveProfileTab}
                        variant="no-line"
                        className="font-victor w-max"
                    />
                </div>

                {activeProfileTab === 'profile' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        <div className="lg:col-span-1 bg-ghoukie-black/5 p-6 rounded-xl">
                            <h2 className="text-2xl font-victor font-bold mb-4 text-ghoukie-black">
                                Мой рейтинг
                            </h2>
                            <div className="flex justify-center">
                                <RatingDiagram rating={calculateAverageRating()} size="lg"/>
                            </div>
                            <p className="text-center mt-4 text-ghoukie-light-gray">
                                Средняя оценка: {calculateAverageRating().toFixed(1)}
                            </p>
                        </div>


                        <div className="lg:col-span-2">

                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-victor font-bold text-ghoukie-black">
                                    Недавно смотрели
                                </h2>
                                <Button variant="ghost" className="text-ghoukie-green">
                                    Показать все <ChevronRightIcon className="ml-1 w-4 h-4"/>
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {recentlyWatched.length > 0 ? (
                                    recentlyWatched.map(item => (
                                        <div key={item.id} className="relative group">
                                            <MovieCard
                                                movie={item}
                                                isWatched={isWatched(item.id, 'films')}
                                                onToggleWatched={() => handleToggleWatched(item.id)}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p className="col-span-4 text-center text-ghoukie-light-gray py-8">
                                        Вы еще ничего не смотрели
                                    </p>
                                )}
                            </div>


                            <div className="mt-12">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-victor font-bold text-ghoukie-black">
                                        Любимые фильмы
                                    </h2>
                                    <Button variant="ghost" className="text-ghoukie-green">
                                        Показать все <ChevronRightIcon className="ml-1 w-4 h-4"/>
                                    </Button>
                                </div>

                                {favorites.films.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {favorites.films.slice(0, 4).map(item => (
                                            <div key={item.id} className="relative group">
                                                <MovieCard movie={item}/>
                                                <button
                                                    onClick={() => handleRemoveFavorite(item.id, 'films')}
                                                    className="absolute top-2 right-2 bg-ghoukie-green/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <TrashIcon className="w-4 h-4"/>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-ghoukie-light-gray py-8">
                                        У вас пока нет любимых фильмов
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeProfileTab !== 'profile' && (
                    <div className="bg-ghoukie-black/5 rounded-xl p-8 text-center">
                        <p className="text-xl text-ghoukie-light-gray">
                            Раздел "{activeProfileTab}" в разработке
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}