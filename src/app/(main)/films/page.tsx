'use client'

import React, { useState, useEffect } from 'react'
import { MediaGrid } from "../../../components/ui/MediaGrid/MediaGrid"
import { FilterPanel } from "../../../components/ui/FilterPanel/FilterPanel"
import { Pagination } from "../../../components/ui/Pagination/Pagination"
import { useAppDispatch, useAppSelector } from "../../../stores/hooks"
import { setFilmFilter, resetFilmFilters } from "../../../stores/slices/films/filmFilters.slice"
import { useGetTopMoviesQuery } from "../../api/films/films.api"

export default function FilmsPage() {
    const [page, setPage] = useState(1)
    const filters = useAppSelector(state => state.filmFilters)
    const dispatch = useAppDispatch()

    // Добавляем логирование для отладки
    console.log('Current filters:', filters)
    console.log('Current page:', page)

    const { data, isLoading, error, isFetching } = useGetTopMoviesQuery({
        limit: 36,
        page,
        ...(filters.year?.from || filters.year?.to ? { year: filters.year } : {}),
        ...(filters.genre ? { genre: filters.genre } : {}),
        ...(filters.country ? { country: filters.country } : {}),
    }, {
        refetchOnMountOrArgChange: true
    })

    useEffect(() => {
        console.log('API response:', { data, isLoading, error, isFetching })
    }, [data, isLoading, error, isFetching])

    const handleFilterChange = (newFilters: Partial<typeof filters>) => {
        console.log('Filter changed:', newFilters)
        setPage(1)
        dispatch(setFilmFilter(newFilters))
    }

    const handleResetAll = () => {
        console.log('Resetting all filters')
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