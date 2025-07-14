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
    useLazyGetTopMoviesQuery,
    useLazyGetTop250MoviesQuery, useGetTop250ListQuery
} from "../../api/films/films.api"
import {useGenres} from "../../../hooks/useGenges"

export default function FilmsPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch()

    const filters = useAppSelector(state => state.filmFilters)
    const { genres: apiGenres } = useGenres()

    const [page, setPage] = useState(1)
    const [displayData, setDisplayData] = useState<any>(null)
    const [previewCount, setPreviewCount] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    // Первоначальная загрузка
    const { data: initialData } = useGetTopMoviesQuery({
        limit: 36,
        page: 1,
        sortField: 'votes.kp',
        sortType: '-1'
    })

    // Ленивые запросы
    const [fetchMovies] = useLazyGetTopMoviesQuery()
    const [fetchTop250] = useLazyGetTop250MoviesQuery()
    const { data: top250List, isLoading: isTop250Loading } = useGetTop250ListQuery();



    // Инициализация данных
    useEffect(() => {
        setDisplayData(initialData)
    }, [initialData])

    // Инициализация из URL
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
            setPreviewCount(250)
        }

        if (Object.keys(initialFilters).length > 0) {
            dispatch(setFilmFilter(initialFilters))
        }
    }, [dispatch, searchParams])

    // Расчет preview count при изменении фильтров
    useEffect(() => {
        if (filters.top250) {
            setPreviewCount(250)
        } else {
            // Для обычных фильтров делаем запрос preview
            fetchMovies({
                limit: 1, // Только для подсчета
                page: 1,
                ...buildQueryParams(filters)
            }).then(({ data }) => {
                setPreviewCount(data?.total || 0)
            })
        }
    }, [filters, fetchMovies])

    // Построение параметров запроса
    const buildQueryParams = useCallback((filters: any) => {
        return {
            ...(filters.year?.from || filters.year?.to ? {
                year: `${filters.year.from || ''}-${filters.year.to || ''}`
            } : {}),
            ...(filters.genres?.length ? { 'genres.name': filters.genres } : {}),
            ...(filters.rating ? { 'rating.kp': `${filters.rating.split('-')[0]}-10` } : {}),
            sortField: 'votes.kp',
            sortType: '-1'
        }
    }, [])

    // Применение фильтров
    const handleApplyFilters = useCallback(async () => {
        setIsLoading(true)
        const params = new URLSearchParams()
        try {
            if (filters.top250) {
                params.set('top250', 'true')
                const { data } = await fetchMovies({
                    limit: 36,
                    page: 1,
                    top250: { $exists: true },
                    sortField: 'top250',
                    sortType: '1'
                })
                setDisplayData(data)
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
                const { data } = await fetchMovies({
                    limit: 36,
                    page: 1,
                    ...buildQueryParams(filters)
                })
                setDisplayData(data)
            }
            setPage(1)
            router.replace(`/films?${params.toString()}`, {scroll: false})
        } catch (error) {
            console.error('Error applying filters:', error)
        } finally {
            setIsLoading(false)
        }
    }, [filters, router, fetchMovies, buildQueryParams])

    // Сброс фильтров
    const handleResetAll = useCallback(() => {
        setPage(1)
        setPreviewCount(null)
        setDisplayData(initialData)
        dispatch(resetFilmFilters())
        router.replace('/films', {scroll: false})
    }, [dispatch, router, initialData])

    // Изменение страницы
    const handlePageChange = useCallback(async (newPage: number) => {
        setIsLoading(true)
        try {
            if (filters.top250) {
                const { data } = await fetchTop250({ page: newPage, limit: 36 })
                setDisplayData(data)
            } else {
                const { data } = await fetchMovies({
                    limit: 36,
                    page: newPage,
                    ...buildQueryParams(filters)
                })
                setDisplayData(data)
            }
            setPage(newPage)
        } catch (error) {
            console.error('Error changing page:', error)
        } finally {
            setIsLoading(false)
        }
    }, [filters, fetchMovies, fetchTop250, buildQueryParams])

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