'use client'

import React, {useCallback, useEffect, useState} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import {MediaGrid} from "../../../components/ui/MediaGrid/MediaGrid"
import {FilterPanel} from "../../../components/ui/FilterPanel/FilterPanel"
import {Pagination} from "../../../components/ui/Pagination/Pagination"
import {useAppDispatch, useAppSelector} from "../../../stores/hooks"
import {resetFilmFilters, setFilmFilter} from "../../../stores/slices/films/filmFilters.slice"
import {
    useGetTopMoviesQuery,
    useLazyGetTop250PreviewQuery,
    useLazyGetTop250Query,
    useLazyGetTopMoviesQuery
} from "../../api/films/films.api"
import {useGenres} from "../../../hooks/useGenges"

export default function FilmsPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch()

    const filters = useAppSelector(state => state.filmFilters)
    const {genres: apiGenres} = useGenres()

    const [page, setPage] = useState(1)
    const [displayData, setDisplayData] = useState<any>(null)
    const [previewCount, setPreviewCount] = useState<number | null>(null)

    const {data: initialData, isLoading: isInitialLoading} = useGetTopMoviesQuery({
        limit: 36,
        page: 1,
        sortField: 'votes.kp',
        sortType: '-1'
    })

    const [fetchMovies, {data: filteredData, isLoading: isFilterLoading}] = useLazyGetTopMoviesQuery()
    const [fetchTop250, {data: top250Data, isLoading: isTop250Loading}] = useLazyGetTop250Query()
    const [fetchTop250Preview] = useLazyGetTop250PreviewQuery()

    const loadTop250Preview = useCallback(async () => {
        const {data} = await fetchTop250Preview()
        setPreviewCount(data?.moviesCount || 250)
    }, [fetchTop250Preview])

    useEffect(() => {
        const params = new URLSearchParams(searchParams)
        const initialFilters: any = {}

        if (params.has('year')) {
            const [from, to] = params.get('year')!.split('-')
            initialFilters.year = {from: from || '', to: to || ''}
        }

        if (params.has('genres')) {
            initialFilters.genres = params.get('genres')!.split(',')
        }

        if (params.has('rating')) {
            initialFilters.rating = params.get('rating')
        }

        if (params.has('top250')) {
            initialFilters.top250 = params.get('top250') === 'true'
            loadTop250Preview()
        }

        if (Object.keys(initialFilters).length > 0) {
            dispatch(setFilmFilter(initialFilters))
        }

        setDisplayData(initialData)
    }, [dispatch, searchParams, initialData, loadTop250Preview])

    useEffect(() => {
        if (filters.top250) {
            loadTop250Preview()
        } else {
            fetchMovies({
                limit: 1,
                page: 1,
                ...buildQueryParams(filters)
            }).then(({data}) => {
                setPreviewCount(data?.total || 0)
            })
        }
    }, [filters, fetchMovies, loadTop250Preview])

    const buildQueryParams = useCallback((filters: any) => {
        return {
            ...(filters.year?.from || filters.year?.to ? {
                year: `${filters.year.from || ''}-${filters.year.to || ''}`
            } : {}),
            ...(filters.genres?.length ? {'genres.name': filters.genres} : {}),
            ...(filters.rating ? {'rating.kp': `${filters.rating.split('-')[0]}-10`} : {}),
            sortField: 'votes.kp',
            sortType: '-1'
        }
    }, [])

    const handleApplyFilters = useCallback(() => {
        const params = new URLSearchParams()

        if (filters.top250) {
            params.set('top250', 'true')
            fetchTop250({page: 1, limit: 36})
                .then(({data}) => setDisplayData(data))
        } else {
            if (filters.year?.from || filters.year?.to) {
                params.set('year', `${filters.year.from || ''}-${filters.year.to || ''}`)
            }

            if (filters.genres?.length) {
                params.set('genres', filters.genres.join(','))
            }

            if (filters.rating) {
                params.set('rating', filters.rating)
            }

            fetchMovies({
                limit: 36,
                page: 1,
                ...buildQueryParams(filters)
            }).then(({data}) => setDisplayData(data))
        }

        setPage(1)
        router.replace(`/films?${params.toString()}`, {scroll: false})
    }, [filters, router, fetchMovies, fetchTop250, buildQueryParams])

    const handleResetAll = useCallback(() => {
        setPage(1)
        setPreviewCount(null)
        setDisplayData(initialData)
        dispatch(resetFilmFilters())
        router.replace('/films', {scroll: false})
    }, [dispatch, router, initialData])

    const handlePageChange = useCallback((newPage: number) => {
        setPage(newPage)
        if (filters.top250) {
            fetchTop250({page: newPage, limit: 36})
                .then(({data}) => setDisplayData(data))
        } else {
            fetchMovies({
                limit: 36,
                page: newPage,
                ...buildQueryParams(filters)
            }).then(({data}) => setDisplayData(data))
        }
    }, [filters, fetchMovies, fetchTop250, buildQueryParams])

    const isLoading = filters.top250 ? isTop250Loading :
        displayData === initialData ? isInitialLoading :
            isFilterLoading

    useEffect(() => {
        if (top250Data) {
            console.log('Processed Top250 data:', top250Data);
        }
    }, [top250Data]);

    return (
        <div className="">
            <FilterPanel
                onFilterChange={(newFilters) => dispatch(setFilmFilter(newFilters))}
                onResetAll={handleResetAll}
                onApplyFilters={handleApplyFilters}
                previewCount={previewCount}
                genres={apiGenres}
                isLoadingPreview={isLoading}
            />

            <section className="px-16">
                <MediaGrid
                    movies={displayData?.docs || []}
                    mediaType="films"
                    isLoading={isLoading}
                    error={displayData?.error ? 'Ошибка загрузки фильмов' : undefined}
                />
            </section>

            {displayData?.pages && displayData.pages > 1 && (
                <Pagination
                    currentPage={page}
                    totalPages={displayData.pages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    )
}