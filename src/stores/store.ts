import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import filmFiltersReducer from './slices/films/filmFilters.slice'
import {kinoApi} from "../app/api/instance";

export const makeStore = () => configureStore({
    reducer: {
        filmFilters: filmFiltersReducer,
        [kinoApi.reducerPath]: kinoApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(kinoApi.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore)