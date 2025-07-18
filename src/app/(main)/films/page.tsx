'use client'

import React, {useCallback, useEffect, useState} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import {MediaGrid} from '../../../components/ui/MediaGrid/MediaGrid'
import {FilterPanel} from '../../../components/ui/FilterPanel/FilterPanel'
import {Pagination} from '../../../components/ui/Pagination/Pagination'
import {useAppDispatch, useAppSelector} from '../../../stores/hooks'
import {resetFilmFilters, setFilmFilter} from '../../../stores/slices/films/filmFilters.slice'
import {useGetTopMoviesQuery, useLazyGetTopMoviesQuery} from '../../api/films/films.api'
import {useGenres} from '../../../hooks/useGenges'
import {useFilmFiltersData} from "../../../hooks/useFilmFiltersData";

export default function FilmsPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch()
    const filters = useAppSelector(state => state.filmFilters)
    const {genres: apiGenres} = useGenres()

    const [page, setPage] = useState(1)
    const [displayData, setDisplayData] = useState<any>(null)
    const [previewCount, setPreviewCount] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(false)


    const {data: initialData} = useGetTopMoviesQuery({
        limit: 36,
        page: 1,
        sortField: 'votes.imdb',
        sortType: '-1',
        notNullFields: 'poster.url',
        year: '2025-2025',
    })

    const {
        platforms,
        ages,
        popularities,
        isLoading: isLoadingFilters
    } = useFilmFiltersData();


    const [fetchMovies] = useLazyGetTopMoviesQuery()

    // Инициализация данных
    useEffect(() => {
        setDisplayData(initialData)
    }, [initialData])

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

    useEffect(() => {
        if (filters.top250) {
            setPreviewCount(250)
        } else if (filters.genres?.length || filters.year || filters.rating) {
            fetchMovies({
                limit: 1,
                page: 1,
                ...buildQueryParams(filters)
            }).then(({data}) => {
                setPreviewCount(data?.total || 0)
            })
        } else {
            setPreviewCount(null)
        }
    }, [filters, fetchMovies])

    const buildQueryParams = useCallback((filters: any) => {
        return {
            ...(filters.year?.from || filters.year?.to ? {
                year: `${filters.year.from || ''}-${filters.year.to || ''}`
            } : {}),
            ...(filters.genres?.length ? {'genres.name': filters.genres} : {}),
            ...(filters.rating ? {'rating.imdb': `${filters.rating.split('-')[0]}-10`} : {}),
            sortField: 'votes.imdb',
            sortType: '-1'
        }
    }, [])


    const handleApplyFilters = useCallback(async () => {
        setIsLoading(true)
        const params = new URLSearchParams()

        try {
            if (filters.top250) {
                // Запрос к топ-250
                params.set('top250', 'true')

                const {data} = await fetchMovies({
                    limit: 36,
                    page: 1,
                    top250: {$exists: true, $lte: 250},
                    sortField: 'top250',
                    sortType: '1'
                })

                // Дополнительная фильтрация на клиенте
                const filteredDocs = data.docs.filter(
                    (movie) => typeof movie.top250 === 'number' && movie.top250 >= 1 && movie.top250 <= 250
                )

                setDisplayData({
                    ...data,
                    docs: filteredDocs,
                    total: 250,
                    pages: Math.ceil(250 / 36)
                })

            } else if (filters.genres?.length || filters.year || filters.rating) {
                // Если есть другие фильтры — применяем их
                if (filters.year?.from || filters.year?.to) {
                    params.set('year', `${filters.year.from || ''}-${filters.year.to || ''}`)
                }

                if (filters.genres?.length) {
                    params.set('genres', filters.genres.join(','))
                }

                if (filters.rating) {
                    params.set('rating', filters.rating)
                }

                const {data} = await fetchMovies({
                    limit: 36,
                    page: 1,
                    ...buildQueryParams(filters)
                })

                setDisplayData(data)

            } else {
                // Нет активных фильтров — загружаем новинки
                const {data} = await fetchMovies({
                    limit: 36,
                    page: 1,
                    year: '2025-2025',
                    sortField: 'year',
                    sortType: '-1'
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
    }, [filters, fetchMovies, buildQueryParams])


    const handleResetAll = useCallback(() => {
        setPage(1)
        setPreviewCount(null)
        setDisplayData(initialData)
        dispatch(resetFilmFilters())
        router.replace('/films', {scroll: false})
    }, [dispatch, router, initialData])

    const handlePageChange = useCallback(async (newPage: number) => {
        setIsLoading(true)

        try {
            if (filters.top250) {
                const {data} = await fetchMovies({
                    limit: 36,
                    page: newPage,
                    top250: {$exists: true},
                    sortField: 'top250',
                    sortType: '1'
                })

                const filteredDocs = data.docs.filter(
                    (movie) => typeof movie.top250 === 'number' && movie.top250 >= 1 && movie.top250 <= 250
                )

                setDisplayData({
                    ...data,
                    docs: filteredDocs,
                    total: 250,
                    pages: Math.ceil(250 / (data.limit || 36))
                })
            } else {
                const {data} = await fetchMovies({
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
    }, [filters, fetchMovies, buildQueryParams])

    const filterData = useFilmFiltersData();
    console.log('Filter Data:', filterData);


    return (
        <div className="">
            <FilterPanel
                onFilterChange={(newFilters) => dispatch(setFilmFilter(newFilters))}
                onResetAll={handleResetAll}
                onApplyFilters={handleApplyFilters}
                previewCount={previewCount}
                genres={apiGenres}
                isLoadingPreview={isLoading}
                platforms={platforms}
                ages={ages}
                popularities={popularities}
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