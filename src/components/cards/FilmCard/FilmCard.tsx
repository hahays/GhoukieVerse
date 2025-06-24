'use client';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
import {ArrowLeftIcon, PlayIcon, UserIcon} from 'lucide-react';
import Image from 'next/image';
import {MovieDetails} from "../../../types/film";
import {RatingSection} from "../../../containers/RatingSection/RatingSection";
import {Icon} from "../../ui/Icon/Icon";
import {IconName} from "lucide-react/dynamic";
import {RatingDiagram} from "../../films/RatingDiagram";
import {ActionToggleGroup} from "../../ui/ActionToggleGroup/ActionToggleGroup";
import {AddToListDropdown} from "../../ui/AddToListDropdown/AddToListDropdown";
import {Tabs} from "../../ui/Tabs/Tabs";
import {ButtonToggle} from "../../ui/ButtonToggle/ButtonToggle";


const CastSection = ({persons}: { persons: any[] }) => {
    const peopleByProfession = persons?.reduce((acc, person) => {
        const profession = person.enProfession || 'actor';
        if (!acc[profession]) acc[profession] = [];
        acc[profession].push(person);
        return acc;
    }, {});

    const professionTitles = {
        director: 'Режиссеры',
        writer: 'Сценаристы',
        operator: 'Операторы',
        composer: 'Композиторы',
        actor: 'Актеры',
        designer: 'Художники',
        producer: 'Продюсеры'
    };

    return (
        <div className="h-[600px] overflow-y-auto pr-3 custom-scrollbar">
            {Object.entries(peopleByProfession).map(([profession, people]) => (
                <div key={profession} className="mb-8">
                    <h3 className="text-2xl font-victor text-ghoukie-green mb-4">
                        {professionTitles[profession] || profession}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {people.map((person, index) => (
                            <div
                                key={index}
                                className="bg-ghoukie-black/80 p-3 rounded-lg border border-ghoukie-green/20 hover:border-ghoukie-green transition-all"
                            >
                                <div className="relative h-32 mb-2 rounded-md overflow-hidden">
                                    {person.photo ? (
                                        <Image
                                            src={person.photo}
                                            alt={person.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div
                                            className="w-full h-full bg-ghoukie-green/10 flex items-center justify-center">
                                            <UserIcon className="w-8 h-8 text-ghoukie-green/50"/>
                                        </div>
                                    )}
                                </div>
                                <p className="font-medium text-ghoukie-white truncate">
                                    {person.name || person.enName}
                                </p>
                                {person.description && (
                                    <p className="text-xs text-ghoukie-light-gray truncate">
                                        {person.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const MediaSection = ({videos}: { videos: any }) => {
    const getYouTubeId = (url: string) => url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&\n?#]+)/)?.[1];

    const youtubeTrailers = videos?.trailers
        ?.filter(trailer => trailer.url?.includes('youtu'))
        .map(trailer => ({
            ...trailer,
            id: getYouTubeId(trailer.url)
        }))
        .filter(trailer => trailer.id)
        .slice(0, 6) || [];

    if (youtubeTrailers.length === 0) {
        return (
            <div
                className="h-[500px] flex items-center justify-center bg-ghoukie-black/10 rounded-xl border border-ghoukie-green/20">
                <p className="text-xl text-ghoukie-light-gray">Нет трейлеров</p>
            </div>
        );
    }

    return (
        <div className="h-[600px] overflow-y-auto custom-scrollbar pr-4">
            <div className="space-y-6 pb-4">
                <div
                    className="relative aspect-video bg-black rounded-xl overflow-hidden border-2 border-ghoukie-green/30">
                    <iframe
                        src={`https://www.youtube.com/embed/${youtubeTrailers[0].id}?modestbranding=1`}
                        className="w-full h-full"
                        allowFullScreen
                    />
                    {/*<div*/}
                    {/*    className="absolute bottom-4 left-4 bg-ghoukie-green/90 text-ghoukie-black px-3 py-1 rounded-md font-bold">*/}
                    {/*</div>*/}
                </div>

                {youtubeTrailers.length > 1 && (
                    <>
                        <h3 className="text-xl font-victor text-ghoukie-green">Другие трейлеры</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {youtubeTrailers.slice(1).map((trailer, index) => (
                                <a
                                    key={index}
                                    href={`https://youtu.be/${trailer.id}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group"
                                >
                                    <div
                                        className="relative aspect-video rounded-lg overflow-hidden border border-ghoukie-green/20 group-hover:border-ghoukie-green transition-colors">
                                        <div
                                            className="w-full h-full bg-cover bg-center"
                                            style={{backgroundImage: `url(https://img.youtube.com/vi/${trailer.id}/mqdefault.jpg)`}}
                                        >
                                            <div
                                                className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                                                <PlayIcon
                                                    className="w-8 h-8 text-white group-hover:text-ghoukie-green transition-colors"/>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-ghoukie-white truncate">
                                        {trailer.name || `Трейлер ${index + 2}`}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

interface FilmPageProps {
    movie: MovieDetails;
    backLink: string;
}

export function FilmPage({movie, backLink}: FilmPageProps) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'info' | 'cast' | 'media'>('info');

    const [watched, setWatched] = useState(false);
    const [toWatch, setToWatch] = useState(false);

    const lists = [
        {id: 'favorites', name: 'Избранное', icon: '⭐'},
        {id: 'watch-later', name: 'Посмотреть позже', icon: '⏱️'},
        {id: 'custom', name: 'Мой список', icon: '📋'},
    ];

    const handleAddToList = (listId: string) => {

    };

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


                        <div className="grid gap-3">

                            <RatingSection rating={rating} size="lg"/>
                            <ActionToggleGroup
                                options={[
                                    {value: 'watched', label: 'Смотрел'},
                                    {value: 'wantToWatch', label: 'Буду смотреть'},
                                ]}

                            />
                            <AddToListDropdown
                                lists={lists}
                                onSelect={handleAddToList}
                                className=""
                            />

                        </div>

                    </div>

                    <div className="flex-1">
                        <h1 className="text-3xl font-victor font-bold mb-3">{movie.name}</h1>
                        {movie.alternativeName && (
                            <p className="text-2xl text-ghoukie-light-gray font-victor mb-3 italic">
                                {movie.alternativeName}
                            </p>
                        )}

                        <div
                            className="flex flex-wrap gap-3 items-center mb-4 text-xl text-ghoukie-light-gray-dark-gray">
                            {genres.length > 0 && <span>{genres.join(', ')}</span>}
                            {movie.year && <span className="text-ghoukie-green">• {movie.year}</span>}
                            {runtime && <span>• {runtime}</span>}
                            {movie.videos?.trailers?.length > 0 && (
                                <a
                                    href={movie.videos.trailers[0].url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-1 text-ghoukie-green hover:underline"
                                >
                                    <Image
                                        src="/icons/youtube.svg"
                                        alt="IMDb"
                                        width={30}
                                        height={20}
                                        className="object-contain align-middle"
                                    />
                                    Трейлер
                                </a>
                            )}
                        </div>

                        <div className="flex gap-6 mb-8">
                            <Tabs
                                items={[
                                    {value: 'info', label: 'Инфо'},
                                    {value: 'cast', label: 'Состав'},
                                    {value: 'media', label: 'Медиа'}
                                ]}
                                value={activeTab}
                                onChange={(tab) => setActiveTab(tab as 'info' | 'cast' | 'media')}
                                className="text-xl font-victor"


                            />
                            <div className="flex gap-4 items-center">
                                <div className="flex items-center text-xl gap-1 text-ghoukie-black">
                                    <Image
                                        src="/icons/imdb_rating.svg"
                                        alt="IMDb"
                                        width={80}
                                        height={20}
                                        className="object-contain"
                                    />
                                    <span>{imdbRating?.toFixed(1) || '—'}</span>
                                </div>
                                <div className="flex items-center text-xl gap-1 text-ghoukie-black">
                                    <Image
                                        src="/icons/kinopoisk_rating.svg"
                                        alt="IMDb"
                                        width={230}
                                        height={100}
                                        className="object-contain"
                                    />
                                    <span>{rating?.toFixed(1) || '—'}</span>
                                </div>
                            </div>
                        </div>

                        {activeTab === 'info' && (
                            <div className="pr-6">

                                <p className="text-2xl mb-8 font-victor text-ghoukie-black leading-relaxed">
                                    {movie.description || 'Описание отсутствует'}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className=" gap-5 items-center">
                                        <h4 className="text-2xl text-ghoukie-black">Режиссёр</h4>
                                        <p className="text-xl text-ghoukie-light-gray">
                                            {movie.persons
                                                ?.filter(p => p.enProfession === 'director')
                                                .map(p => p.name)
                                                .join(', ') || 'Не указано'}
                                        </p>
                                    </div>
                                    <div className=" gap-5 items-center">
                                        <h4 className="text-2xl text-ghoukie-black">Сценарий</h4>
                                        <p className="text-xl text-ghoukie-light-gray">
                                            {movie.persons
                                                ?.filter(p => p.enProfession === 'writer')
                                                .map(p => p.name)
                                                .join(', ') || 'Не указано'}
                                        </p>
                                    </div>
                                    <div className=" gap-5 items-center">
                                        <h4 className="text-2xl text-ghoukie-black">Оператор</h4>
                                        <p className="text-xl text-ghoukie-light-gray">
                                            {movie.persons
                                                ?.filter(p => p.enProfession === 'operator')
                                                .map(p => p.name)
                                                .join(', ') || 'Не указано'}
                                        </p>
                                    </div>
                                    <div className=" gap-5 items-center">
                                        <h4 className="text-2xl text-ghoukie-black">Композитор</h4>
                                        <p className="text-xl text-ghoukie-light-gray">
                                            {movie.persons
                                                ?.filter(p => p.enProfession === 'composer')
                                                .map(p => p.name)
                                                .join(', ') || 'Не указано'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'cast' && <CastSection persons={movie.persons}/>}
                        {activeTab === 'media' && <MediaSection videos={movie.videos}/>}

                    </div>

                    <div className="relative w-[450px]">
                        <div
                            className="absolute w-full h-full left-[-36px] bottom-[-20px] bg-ghoukie-green rounded-lg z-0"/>

                        <div className="relative z-10 bg-ghoukie-black text-white p-6 rounded-lg shadow-xl h-full">
                            <h2 className="text-2xl flex justify-center font-bold font-victor mb-6 text-ghoukie-white">
                                ГДЕ ПОСМОТРЕТЬ
                            </h2>

                            <div className="space-y-4 mb-8">
                                {[
                                    {name: "Kinopoisk HD", icon: "kinopoisk"},
                                    {name: "IVI", icon: "ivi"},
                                    {name: "Okko", icon: "okko"},
                                    {name: "Apple TV", icon: "apple-tv"},
                                    {name: "Google Play", icon: "google-play"}
                                ].map((platform, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 p-3 hover:bg-gray-800 rounded-lg transition-colors"
                                    >
                                        <Icon
                                            name={platform.icon as IconName}
                                            className="fill-ghoukie-green w-12 h-12"
                                        />
                                        <div className="flex-1">
                                            <p className="text-2xl font-victor text-ghoukie-light-gray">{platform.name}</p>

                                        </div>
                                        <ButtonToggle variant="toggle" className="">
                                            Смотреть
                                        </ButtonToggle>
                                    </div>
                                ))}
                            </div>

                            <RatingDiagram rating={4.5}/>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
