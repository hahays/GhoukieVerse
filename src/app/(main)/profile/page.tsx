// src/app/(main)/profile/page.tsx
'use client'

import {useEffect, useState} from 'react'

import {ChevronRightIcon, TrashIcon} from 'lucide-react'
import {Tabs} from "../../../components/ui/Tabs/Tabs";
import {RatingDiagram} from "../../../components/films/RatingDiagram";
import {Button} from "../../../components/ui/Button";
import {MovieCard} from "../../../components/cards/MovieCard/MovieCard";

type ContentType = 'films' | 'games' | 'anime'
type ProfileTabType = 'profile' | 'films' | 'favorites' | 'dropped' | 'lists'

export default function ProfilePage() {
    const [activeContentTab, setActiveContentTab] = useState<ContentType>('films')
    const [activeProfileTab, setActiveProfileTab] = useState<ProfileTabType>('profile')
    const [favorites, setFavorites] = useState({
        films: [],
        games: [],
        anime: []
    })
    const [recentlyWatched, setRecentlyWatched] = useState<any[]>([])

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('ghoukie-favorites') || '{}')
        const storedWatched = JSON.parse(localStorage.getItem('ghoukie-watched') || '[]')

        setFavorites({
            films: storedFavorites.films || [],
            games: storedFavorites.games || [],
            anime: storedFavorites.anime || []
        })
        setRecentlyWatched(storedWatched.slice(0, 4))
    }, [])

    const removeFromFavorites = (id: number, type: ContentType) => {
        const updated = {
            ...favorites,
            [type]: favorites[type].filter(item => item.id !== id)
        }
        setFavorites(updated)
        localStorage.setItem('ghoukie-favorites', JSON.stringify(updated))
    }

    const calculateAverageRating = () => {
        const allFilms = [...favorites.films, ...recentlyWatched]
        if (allFilms.length === 0) return 0
        const sum = allFilms.reduce((acc, film) => acc + (film.rating?.kp || 0), 0)
        return sum / allFilms.length
    }

    return (
        <div className="min-h-screen bg-ghoukie-white">

            <div className="mt-28 bg-ghoukie-black h-24 w-full"></div>


            <div className="container mx-auto px-4">

                <div className="flex flex-col md:flex-row gap-8 -mt-12 relative z-10">

                    <div className="flex-shrink-0 flex flex-col items-center md:items-start">
                        <div
                            className="w-32 h-32 rounded-full bg-ghoukie-green/20 border-4 border-ghoukie-green overflow-hidden mb-4">
                            <img
                                src="/default-avatar.png"
                                alt="Аватар"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h1 className="text-3xl font-victor font-bold text-ghoukie-black">
                            Привет, Путешественник!
                        </h1>
                    </div>

                    <div className="flex-1">
                        <Tabs
                            items={[
                                {value: 'films', label: `Фильмы (${favorites.films.length})`},
                                {value: 'games', label: `Игры (${favorites.games.length})`},
                                {value: 'anime', label: `Аниме (${favorites.anime.length})`}
                            ]}
                            value={activeContentTab}
                            onChange={setActiveContentTab}
                            className="text-xl font-victor"
                        />
                    </div>
                </div>

                <div className="border-t border-b border-ghoukie-black/10 py-2 my-6">
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
                        className="font-victor"
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
                                        <MovieCard key={item.id} movie={item}/>
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
                                                    onClick={() => removeFromFavorites(item.id, 'films')}
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