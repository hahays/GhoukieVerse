'use client';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {ArrowLeftIcon, StarIcon} from 'lucide-react';
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
    const [activeTab, setActiveTab] = useState<'info' | 'cast' | 'media'>('info');
    const [watched, setWatched] = useState(false);
    const [toWatch, setToWatch] = useState(false);

    const handleBack = () => {
        if (backLink && backLink.startsWith('/')) {
            router.push(backLink);
        } else {
            router.push('/films');
        }
    };

    const genres = movie.genres?.map(g => g.name) || [];
    const countries = movie.countries?.map(c => c.name) || [];
    const runtime = movie.movieLength ? `${movie.movieLength} мин` : 'N/A';
    const rating = movie.rating?.kp || 0;
    const imdbRating = movie.rating?.imdb || 0;
    const directors = movie.persons?.filter(p => p.enProfession === 'director') || [];
    const actors = movie.persons?.filter(p => p.enProfession === 'actor')?.slice(0, 8) || [];

    return (
        <div className="min-h-screen">
            <div className="mt-28 bg-ghoukie-black h-24 w-full"></div>
            <div className="px-16">
                <div className="relative h-[430px] w-full rounded-b-lg overflow-hidden mt-16">
                    <Image
                        src={movie.backdrop?.url || '/placeholder-backdrop.jpg'}
                        alt={movie.name || 'Баннер фильма'}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent">
                        <button
                            onClick={() => router.push(backLink)}
                            className="absolute top-6 left-6 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                        >
                            <ArrowLeftIcon className="w-5 h-5"/>
                        </button>
                    </div>
                </div>

                <main className="mx-auto py-8 flex gap-8 items-stretch">
                    <div className="md:w-[354px] flex-shrink-0">
                        <div className="aspect-auto rounded-lg overflow-hidden shadow-lg border-4 border-ghoukie-green">
                            <Image
                                src={movie.poster?.url || 'https://placehold.co/300x450'}
                                alt={movie.name || 'Постер фильма'}
                                width={354}
                                height={531}
                                className="object-cover"
                                loading="lazy"
                                quality={75}
                            />
                        </div>

                        <RatingSection rating={rating}/>

                        <div className="mt-4 space-y-2">
                            <button
                                className={`w-full px-4 py-2 rounded-md ${watched ? "bg-green-600 text-white" : "bg-green-100 text-green-800"}`}
                                onClick={() => setWatched(!watched)}
                            >
                                {watched ? 'Вы смотрели' : 'Отметить просмотренным'}
                            </button>
                            <button
                                className={`w-full px-4 py-2 rounded-md ${toWatch ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800"}`}
                                onClick={() => setToWatch(!toWatch)}
                            >
                                {toWatch ? 'В вашем списке' : 'Буду смотреть'}
                            </button>
                        </div>
                    </div>

                    <div className="flex-1">
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
                            <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">{runtime}</span>
                            {movie.ageRating && (
                                <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                                    {movie.ageRating}+
                                </span>
                            )}
                        </div>

                        <div className="flex gap-2 mb-6 border-b border-gray-200 pb-2">
                            <button
                                className={`px-4 py-2 rounded-md ${activeTab === 'info' ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"}`}
                                onClick={() => setActiveTab('info')}
                            >
                                О фильме
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md ${activeTab === 'cast' ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"}`}
                                onClick={() => setActiveTab('cast')}
                            >
                                Актёры
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md ${activeTab === 'media' ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"}`}
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

                    <div className="relative w-[450px]">
                        <div className="absolute w-full h-full left-[-36px] bottom-[-20px] bg-ghoukie-green rounded-lg z-0" />

                        <div className="relative z-10 bg-ghoukie-black text-white p-6 rounded-lg shadow-xl h-full">
                            <h2 className="text-2xl flex justify-center font-bold font-victor mb-6 text-ghoukie-white">
                                ГДЕ ПОСМОТРЕТЬ
                            </h2>

                            <div className="space-y-4 mb-8">
                                {[{ name: "Kinopoisk HD", icon: "🎬", price: "от 299 ₽" }, { name: "IVI", icon: "📺", price: "по подписке" }, { name: "Okko", icon: "🍿", price: "аренда 350 ₽" }].map((platform, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 p-3 hover:bg-gray-800 rounded-lg transition-colors"
                                    >
                                        <span className="text-2xl">{platform.icon}</span>
                                        <div className="flex-1">
                                            <p className="font-medium">{platform.name}</p>
                                            <p className="text-sm text-gray-400">{platform.price}</p>
                                        </div>
                                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors">
                                            Смотреть
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-700">
                                <h3 className="text-2xl flex justify-center font-bold font-victor text-center">
                                    СРЕДНИЙ РЕЙТИНГ
                                </h3>
                                <h2 className="text-3xl flex justify-center font-bold font-victor mb-4 text-center">4.5</h2>

                                <div className="flex items-end justify-center h-20 gap-1">
                                    <div className="flex flex-col items-center h-full justify-end mr-2">
                                        <StarIcon className="w-5 h-5 text-ghoukie-light-green fill-ghoukie-green" />
                                    </div>

                                    {[10, 70, 20, 80, 70, 20, 10, 25, 10].map((heightPercent, index) => (
                                        <div key={index} className="flex flex-col items-center h-full justify-end">
                                            <div
                                                className="w-6 rounded bg-ghoukie-white transition-all duration-300"
                                                style={{ height: `${heightPercent}%` }}
                                            ></div>
                                        </div>
                                    ))}

                                    <div className="flex flex-col items-center h-full justify-end ml-2">
                                        <div className="flex mb-1">
                                            <StarIcon className="w-5 h-5 text-ghoukie-light-green fill-ghoukie-green" />
                                        </div>
                                        <div className="flex mb-1">
                                            <StarIcon className="w-5 h-5 text-ghoukie-light-green fill-ghoukie-green" />
                                            <StarIcon className="w-5 h-5 text-ghoukie-light-green fill-ghoukie-green" />
                                        </div>
                                        <div className="flex">
                                            <StarIcon className="w-5 h-5 text-ghoukie-light-green fill-ghoukie-green" />
                                            <StarIcon className="w-5 h-5 text-ghoukie-light-green fill-ghoukie-green" />
                                            <StarIcon className="w-5 h-5 text-ghoukie-light-green fill-ghoukie-green" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
