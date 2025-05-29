import { FilmPage } from "../../../../components/cards/FilmCard/FilmCard";
import { getMovieDetails } from "../../../../lib/api";

export default async function Page({
                                       params,
                                       searchParams
                                   }: {
    params: { id: string };
    searchParams: { from?: string };
}) {
    const movie = await getMovieDetails(params.id);
    return <FilmPage movie={movie} backLink={searchParams.from || '/'} />;
}