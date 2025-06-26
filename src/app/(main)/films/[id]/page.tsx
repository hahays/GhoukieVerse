import {FilmPage} from "../../../../components/cards/FilmCard/FilmCard";
import {getMovieDetailsServer} from "../../../../lib/utils/server-api";


const movieCache = new Map<string, any>();

export default async function Page({
                                       params,
                                       searchParams
                                   }: {
    params: { id: string };
    searchParams: { from?: string };
}) {
    if (!params.id) {
        return <div>ID фильма не указан</div>;
    }

    const cachedMovie = movieCache.get(params.id);
    if (cachedMovie) {
        return <FilmPage movie={cachedMovie} backLink={searchParams.from || '/'}/>;
    }

    try {
        const movie = await getMovieDetailsServer(params.id);

        movieCache.set(params.id, movie);

        return <FilmPage movie={movie} backLink={searchParams.from || '/'}/>;
    } catch (error) {
        console.error('Ошибка загрузки фильма:', error);
        return <div>Не удалось загрузить данные фильма</div>;
    }
}