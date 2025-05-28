'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeftIcon, PlusIcon } from 'lucide-react'
import { MovieDetails } from "../../../types/film"
import { RatingSection } from "../../../containers/RatingSection/RatingSection"
import { EyeIcon, HeartIcon } from "@heroicons/react/24/outline"


const CastSection = ({ movieId }) => <div>Cast section for {movieId}</div>
const MediaSection = ({ movieId }) => <div>Media section for {movieId}</div>

interface FilmPageProps {
    movie: MovieDetails
    backLink: string
}

export function FilmPage({ movie, backLink }: FilmPageProps) {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<'info' | 'cast' | 'media'>('info')
    const [watched, setWatched] = useState(false)
    const [toWatch, setToWatch] = useState(false)

    const genres = movie.Genre?.split(', ') || []
    const runtime = movie.Runtime || 'N/A'
    const rating = movie.imdbRating ? parseFloat(movie.imdbRating) : 0
    const kinopoiskRating = rating > 0 ? (rating * 0.8 + 2).toFixed(1) : 0


    const watchOptions = [
        { platform: "Google Play", icon: "▶️" },
        { platform: "Apple TV", icon: "🍎" }
    ]

    const stats = {
        views: 952000,
        addedToWatchlist: 742000,
        favorited: 300000
    }

    return (
        <div className="bg-green-100 min-h-screen">

            <div className="relative">
                <img
                    src={movie.Banner !== 'N/A' ? movie.Banner : 'https://placehold.co/1920x400 '}
                    alt="Film Banner"
                    className="w-full h-96 object-cover"
                />
            </div>


            <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[2fr_3fr_1fr] gap-8">

                <div className="md:row-span-2">
                    <img
                        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/300x450 '}
                        alt="Film Poster"
                        className="w-full mb-4 rounded-lg shadow-md"
                    />
                    <RatingSection rating={movie.imdbRating} />
                    <div className="mt-4 space-y-2">
                        <button
                            className={`w-full px-4 py-2 rounded-md ${
                                watched ? "bg-lime-500 text-white" : "bg-lime-200 text-lime-600"
                            }`}
                            onClick={() => setWatched(!watched)}
                        >
                            Смотрел
                        </button>
                        <button
                            className={`w-full px-4 py-2 rounded-md ${
                                toWatch ? "bg-lime-500 text-white" : "bg-lime-200 text-lime-600"
                            }`}
                            onClick={() => setToWatch(!toWatch)}
                        >
                            Буду смотреть
                        </button>
                        <button className="w-full bg-lime-200 hover:bg-lime-300 text-lime-600 px-4 py-2 rounded-md flex items-center justify-center gap-2">
                            <PlusIcon className="w-4 h-4" />
                            Добавить в список
                        </button>
                    </div>
                </div>

                <div>
                    <h1 className="text-2xl font-bold mb-2">{movie.Title}</h1>
                    <p className="text-xl font-medium mb-2 text-gray-600">{movie.Year}</p>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span>{genres.join(", ")}</span>
                        <span>•</span>
                        <span>{runtime}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <button
                            className={`px-4 py-2 rounded-md ${
                                activeTab === 'info' ? "bg-lime-500 text-white" : "bg-lime-200 text-lime-600"
                            }`}
                            onClick={() => setActiveTab('info')}
                        >
                            Инфо
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${
                                activeTab === 'cast' ? "bg-lime-500 text-white" : "bg-lime-200 text-lime-600"
                            }`}
                            onClick={() => setActiveTab('cast')}
                        >
                            Состав
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${
                                activeTab === 'media' ? "bg-lime-500 text-white" : "bg-lime-200 text-lime-600"
                            }`}
                            onClick={() => setActiveTab('media')}
                        >
                            Медиа
                        </button>
                        <div className="flex items-center gap-2 ml-auto">
                            <span className="bg-red-600 text-white px-2 py-1 rounded-md">IMDb</span>
                            <span>{rating}/10</span>
                            <span className="bg-yellow-500 text-white px-2 py-1 rounded-md">Кинопоиск</span>
                            <span>{kinopoiskRating}/10</span>
                        </div>
                    </div>
                    <hr className="my-4 border-gray-300" />
                    {activeTab === 'info' && (
                        <div>
                            <p className="text-lg mb-6">{movie.Plot || 'Описание отсутствует'}</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-100 p-3 rounded-lg">
                                    <h4 className="text-gray-500 text-sm">Режиссер</h4>
                                    <p className="font-medium">{movie.Director || 'Не указано'}</p>
                                </div>
                                <div className="bg-gray-100 p-3 rounded-lg">
                                    <h4 className="text-gray-500 text-sm">Сценарий</h4>
                                    <p className="font-medium">{movie.Writer || 'Не указано'}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'cast' && <CastSection movieId={movie.imdbID} />}
                    {activeTab === 'media' && <MediaSection movieId={movie.imdbID} />}
                </div>


                <aside className="md:col-start-4 md:row-span-2 bg-black text-white p-4 rounded-lg sticky top-24 self-start">
                    <h2 className="text-xl font-bold mb-4">ГДЕ ПОСМОТРЕТЬ:</h2>
                    {watchOptions.map((option, index) => (
                        <div key={index} className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">{option.icon}</span>
                            <span>{option.platform}</span>
                            <button className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-md ml-auto">
                                Перейти
                            </button>
                        </div>
                    ))}
                    <h2 className="text-xl font-bold mb-4 mt-8">СРЕДНИЙ РЕЙТИНГ</h2>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-4xl">4.5</span>
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-yellow-400">⭐</span>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <EyeIcon className="w-4 h-4" />
                            <span>{stats.views.toLocaleString()} просмотров</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <PlusIcon className="w-4 h-4" />
                            <span>{stats.addedToWatchlist.toLocaleString()} в списках</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <HeartIcon className="w-4 h-4" />
                            <span>{stats.favorited.toLocaleString()} в избранном</span>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    )
}