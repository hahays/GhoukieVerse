'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { MediaGrid } from "../../../components/ui/MediaGrid/MediaGrid"
import { FilterPanel } from "../../../components/ui/FilterPanel/FilterPanel"
import { Pagination } from "../../../components/ui/Pagination/Pagination"
import { useAppDispatch, useAppSelector } from "../../../stores/hooks"
import { setFilmFilter, resetFilmFilters } from "../../../stores/slices/films/filmFilters.slice"
import { useGetTopMoviesQuery } from "../../api/films/films.api"
import { useDebounce } from "../../../hooks/useDebounce"

export default function FilmsPage() {
    const [page, setPage] = useState(1)
    const filters = useAppSelector(state => state.filmFilters)
    const dispatch = useAppDispatch()

    const debouncedFilters = useDebounce(filters, 500)

    const queryParams = useMemo(() => {
        const params: any = {
            limit: 36,
            page,
        }

        if (debouncedFilters.year?.from || debouncedFilters.year?.to) {
            params.year = `${debouncedFilters.year.from || ''}-${debouncedFilters.year.to || ''}`
        }

        if (debouncedFilters.genres?.length) {
            params['genres.name'] = debouncedFilters.genres
        }

        if (debouncedFilters.country) {
            params['countries.name'] = debouncedFilters.country
        }

        if (debouncedFilters.rating) {
            params['rating.kp'] = debouncedFilters.rating
        }

        if (debouncedFilters.platform) {
            params['platform.name'] = debouncedFilters.platform
        }
        if (debouncedFilters.watched) {
            params.isWatched = true
        }
        if (debouncedFilters.universe) {
            params.isUniverse = true
        }

        return params
    }, [debouncedFilters, page])

    const { data, isLoading, error, isFetching } = useGetTopMoviesQuery(queryParams, {
        refetchOnMountOrArgChange: true
    })

    const handleFilterChange = (newFilters: Partial<typeof filters>) => {
        setPage(1)
        dispatch(setFilmFilter(newFilters))
    }

    const handleResetAll = () => {
        setPage(1)
        dispatch(resetFilmFilters())
    }

    return (
        <div className="">
            <FilterPanel
                onFilterChange={handleFilterChange}
                onResetAll={handleResetAll}
            />

            <section className="px-16">
                <MediaGrid
                    movies={data?.docs || []}
                    mediaType="films"
                    isLoading={isLoading || isFetching}
                    error={error ? 'Ошибка загрузки фильмов' : undefined}
                />
            </section>

            {data && data.docs.length > 0 && (
                <Pagination
                    currentPage={page}
                    totalPages={data.pages || 1}
                    onPageChange={setPage}
                />
            )}
        </div>
    )
}