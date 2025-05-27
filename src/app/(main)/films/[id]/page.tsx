
import {getMovieDetails} from "../../../../lib/api";
import {FilmCard} from "../../../../components/cards/FilmCard";


interface FilmPageProps {
    params: { id: string };
    searchParams: { from?: string };
}

export default async function FilmPage({params, searchParams}: FilmPageProps) {

    const movieId = params.id;
    const fromParam = searchParams.from || '/';

    const movie = await getMovieDetails(movieId);

    return (
        <div className="container mx-auto px-4 py-40">
            <FilmCard
                movie={movie}
                backLink={fromParam}
            />
        </div>
    );
}