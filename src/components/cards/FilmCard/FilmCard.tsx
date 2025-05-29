'use client';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {ArrowLeftIcon} from 'lucide-react';
import Image from 'next/image';
import {MovieDetails} from "../../../types/film";
import {RatingSection} from "../../../containers/RatingSection/RatingSection";


const CastSection = ({persons}: { persons: any[] }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {persons?.map((person, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-lg">
                <p className="font-medium">{person.name || person.enName || 'Не указано'}</p>
                <p className="text-sm text-gray-500">{person.description || person.enProfession}</p>
            </div>
        ))}
    </div>
);

const MediaSection = ({videos}: { videos: any }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos?.trailers?.map((trailer: any, index: number) => (
            <div key={index} className="bg-gray-100 p-3 rounded-lg">
                <p className="font-medium">{trailer.name || 'Трейлер'}</p>
                <div className="aspect-video bg-black mt-2">
                    {/* Здесь можно вставить iframe с YouTube или другим видео */}
                    <p className="text-white p-4">Видео: {trailer.url}</p>
                </div>
            </div>
        ))}
    </div>
);

interface FilmPageProps {
    movie: MovieDetails;
    backLink: string;
}

export function FilmPage({movie, backLink}: FilmPageProps) {
    const router = useRouter();
    const handleBack = () => {
        if (backLink.startsWith('/')) {
            router.push(backLink);
        } else {
            router.push('/films'); // Fallback на страницу фильмов
        }
    };
    const [activeTab, setActiveTab] = useState<'info' | 'cast' | 'media'>('info');
    const [watched, setWatched] = useState(false);
    const [toWatch, setToWatch] = useState(false);

    // Форматирование данных из нового API
    const genres = movie.genres?.map(g => g.name) || [];
    const countries = movie.countries?.map(c => c.name) || [];
    const runtime = movie.movieLength ? `${movie.movieLength} мин` : 'N/A';
    const rating = movie.rating?.kp || 0;
    const imdbRating = movie.rating?.imdb || 0;

    // Персонажи (актеры, режиссеры и т.д.)
    const directors = movie.persons?.filter(p => p.enProfession === 'director') || [];
    const actors = movie.persons?.filter(p => p.enProfession === 'actor') || [];

    const watchOptions = [
        {platform: "Kinopoisk", icon: "🎬"},
        {platform: "IVI", icon: "📺"},
        {platform: "Okko", icon: "🍿"}
    ];

    const stats = {
        views: movie.votes?.kp || 0,
        ratingCount: movie.votes?.imdb || 0
    };

    return (
        <div className="relative h-96 w-full">
            <button
                onClick={handleBack}
                className="absolute top-20 left-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
                <ArrowLeftIcon className="w-5 h-5" />
            </button>

            <div className="relative h-96 w-full">
                <Image
                    src={movie.backdrop?.url || movie.poster?.url || '/placeholder-backdrop.jpg'}
                    alt={movie.name || 'Баннер фильма'}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"/>
            </div>

            <main
                className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[300px_1fr_300px] gap-8 -mt-16 relative z-1">

                <div className="md:row-span-2">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg border-4 border-white">
                        <Image
                            src={movie.poster?.url || 'https://placehold.co/300x450'}
                            alt={movie.name || 'Постер фильма'}
                            fill
                            className="object-cover"
                            loading="lazy"
                            quality={75}
                        />
                    </div>

                    <RatingSection rating={rating}/>

                    <div className="mt-4 space-y-2">
                        <button
                            className={`w-full px-4 py-2 rounded-md ${
                                watched ? "bg-green-600 text-white" : "bg-green-100 text-green-800"
                            }`}
                            onClick={() => setWatched(!watched)}
                        >
                            {watched ? 'Вы смотрели' : 'Отметить просмотренным'}
                        </button>
                        <button
                            className={`w-full px-4 py-2 rounded-md ${
                                toWatch ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800"
                            }`}
                            onClick={() => setToWatch(!toWatch)}
                        >
                            {toWatch ? 'В вашем списке' : 'Буду смотреть'}
                        </button>
                    </div>
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-1">{movie.name || movie.alternativeName}</h1>
                    <p className="text-xl text-gray-600 mb-4">
                        {movie.alternativeName && <span>{movie.alternativeName} • </span>}
                        {movie.year}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {genres.map((genre, index) => (
                            <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                {genre}
              </span>
                        ))}
                        <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
              {runtime}
            </span>
                        {movie.ageRating && (
                            <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                {movie.ageRating}+
              </span>
                        )}
                    </div>

                    <div className="flex gap-2 mb-6 border-b border-gray-200 pb-2">
                        <button
                            className={`px-4 py-2 rounded-md ${
                                activeTab === 'info' ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
                            }`}
                            onClick={() => setActiveTab('info')}
                        >
                            О фильме
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${
                                activeTab === 'cast' ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
                            }`}
                            onClick={() => setActiveTab('cast')}
                        >
                            Актёры
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${
                                activeTab === 'media' ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
                            }`}
                            onClick={() => setActiveTab('media')}
                        >
                            Трейлеры
                        </button>
                    </div>

                    {activeTab === 'info' && (
                        <div>
                            <p className="text-lg mb-6 leading-relaxed">
                                {movie.description || 'Описание отсутствует'}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <h4 className="text-gray-500 text-sm mb-1">Режиссер</h4>
                                    <p className="font-medium">
                                        {directors.map(d => d.name || d.enName).join(', ') || 'Не указано'}
                                    </p>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <h4 className="text-gray-500 text-sm mb-1">Страна</h4>
                                    <p className="font-medium">
                                        {countries.join(', ') || 'Не указано'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'cast' && <CastSection persons={actors.slice(0, 8)}/>}
                    {activeTab === 'media' && <MediaSection videos={movie.videos}/>}
                </div>

                <aside className="bg-white p-6 rounded-lg shadow-md sticky top-8 self-start">
                    <h2 className="text-xl font-bold mb-4">Где смотреть</h2>
                    <div className="space-y-3">
                        {watchOptions.map((option, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <span className="text-2xl">{option.icon}</span>
                                <span className="font-medium">{option.platform}</span>
                                <button
                                    className="ml-auto bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
                                    Смотреть
                                </button>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-xl font-bold mt-8 mb-4">Рейтинги</h2>
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-medium">Kinopoisk</span>
                                <span className="font-bold">{rating.toFixed(1)}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-yellow-500 h-2 rounded-full"
                                    style={{width: `${rating * 10}%`}}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-medium">IMDb</span>
                                <span className="font-bold">{imdbRating.toFixed(1)}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-500 h-2 rounded-full"
                                    style={{width: `${imdbRating * 10}%`}}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Просмотры</span>
                            <span className="font-medium">{stats.views.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Оценки</span>
                            <span className="font-medium">{stats.ratingCount.toLocaleString()}</span>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}