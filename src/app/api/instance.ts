import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://api.kinopoisk.dev/v1.4/',
    prepareHeaders: (headers) => {
        headers.set('X-API-KEY', process.env.NEXT_PUBLIC_KINO_API_KEY || '')
        return headers
    }
})

export const kinoApi = createApi({
    reducerPath: 'kinoApi',
    baseQuery,
    tagTypes: ['Movies', 'MovieDetails', 'Top250'],
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    endpoints: () => ({}),
})