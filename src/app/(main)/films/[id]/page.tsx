import {FilmPage} from "../../../../components/cards/FilmCard/FilmCard";
import {getMovieDetails} from "../../../../lib/api";


const movieCache = new Map<string, any>();

export default async function Page({
                                       params,
                                       searchParams
                                   }: {
    params: { id: string };
    searchParams: { from?: string };
}) {

    if (movieCache.has(params.id)) {
        return <FilmPage movie={movieCache.get(params.id)} backLink={searchParams.from || '/'}/>;
    }

    const movie = await getMovieDetails(params.id);


    movieCache.set(params.id, movie);

    return <FilmPage movie={movie} backLink={searchParams.from || '/'}/>;
}