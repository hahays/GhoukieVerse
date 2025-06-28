import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {MovieFilterParams} from "../../../types/film";


const loadState = () => {
    try {
        const serializedState = localStorage.getItem('filmFilters');
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (e) {
        return undefined;
    }
};


interface FilmFiltersState extends MovieFilterParams {
    isInitialized: boolean
}

const initialState: FilmFiltersState = {
    year: { from: '', to: '' },
    genre: '',
    action: false,
    country: undefined,
    rating: undefined,
    isInitialized: false
}

export const filmFiltersSlice = createSlice({
    name: 'filmFilters',
    initialState,
    reducers: {
        setFilmFilter: (state, action: PayloadAction<Partial<FilmFiltersState>>) => {
            return { ...state, ...action.payload };
        },
        resetFilmFilters: () => initialState,
    },
})

export const { setFilmFilter, resetFilmFilters } = filmFiltersSlice.actions
export default filmFiltersSlice.reducer