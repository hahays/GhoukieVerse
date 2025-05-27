'use client'

import {useRouter} from 'next/navigation';
import {MovieDetails} from "../../../types/film";
import {useState} from "react";
import {ArrowLeftIcon, CreditCard} from "lucide-react";
import {RatingSection} from "../../../containers/RatingSection/RatingSection";


interface FilmCardProps {
    movie: MovieDetails;
    backLink: string;
}

export function FilmCard({movie, backLink}: FilmCardProps) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'info' | 'cast' | 'media'>('info');

    return (
        <div className="bg-ghoukie-dark rounded-lg p-6">
            <button
                onClick={() => router.push(backLink)}
                className="mb-6 flex items-center gap-2 text-ghoukie-light-green hover:text-ghoukie-green"
            >
                <ArrowLeftIcon className="w-5 h-5"/>
                Назад
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="w-full rounded-lg shadow-lg mb-4"
                    />
                    <RatingSection rating={movie.imdbRating}/>
                </div>


                <div className="md:col-span-2">
                    <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
                    <div className="flex flex-wrap gap-4 mb-6">
                        <span className="text-ghoukie-light-green">{movie.Year}</span>
                        <span>{movie.Runtime}</span>
                        <span>{movie.Genre}</span>
                    </div>

                    <div className="flex border-b border-ghoukie-light-gray mb-6">
                        {['info', 'cast', 'media'].map((tab) => (
                            <button
                                key={tab}
                                className={`px-4 py-2 font-medium ${
                                    activeTab === tab
                                        ? 'border-b-2 border-ghoukie-green text-ghoukie-green'
                                        : 'text-ghoukie-light-gray'
                                }`}
                                onClick={() => setActiveTab(tab as any)}
                            >
                                {tab === 'info' && 'Инфо'}
                                {tab === 'cast' && 'Состав'}
                                {tab === 'media' && 'Медиа'}
                            </button>
                        ))}
                    </div>


                    {activeTab === 'info' && (
                        <div>
                            <p className="mb-6">{movie.Plot}</p>
                            <div className="grid grid-cols-2 gap-4">
                                <CreditCard role="Режиссер" name={movie.Director}/>
                                <CreditCard role="Сценарист" name={movie.Writer}/>
                            </div>
                        </div>
                    )}
                    {activeTab === 'cast' && <CastSection movieId={movie.imdbID}/>}
                    {activeTab === 'media' && <MediaSection movieId={movie.imdbID}/>}
                </div>
            </div>
        </div>
    );
}