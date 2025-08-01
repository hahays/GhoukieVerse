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
    platform: string
    age: string
    popularity: string
    studio: string
    productionCompanies: string;
    type: string
}

const initialState: FilmFiltersState = {
    year: {from: '', to: ''},
    genres: [],
    countries: [],
    rating: '',
    platform: '',
    productionCompanies: '',
    duration: '',
    date: '',
    tag: '',
    age: '',
    popularity: '',
    watched: false,
    universe: false,
    isInitialized: false,
    studio: '',
    favorite: false,
    actor: '',
    type: '',
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