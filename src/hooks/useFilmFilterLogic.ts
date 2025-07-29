import { useCallback } from 'react';
import {useAppDispatch, useAppSelector} from "../stores/hooks";
import {resetFilmFilters, setFilmFilter} from "../stores/slices/films/filmFilters.slice";
import {FilmFilters} from "../types/film";


export function useFilmFilterLogic() {
    const dispatch = useAppDispatch();
    const filters = useAppSelector(s => s.filmFilters);

    const update = useCallback((patch: Partial<FilmFilters>) => {
        dispatch(setFilmFilter(patch));
    }, [dispatch]);

    const reset = useCallback(() => {
        dispatch(resetFilmFilters());
    }, [dispatch]);

    return { filters, update, reset };
}