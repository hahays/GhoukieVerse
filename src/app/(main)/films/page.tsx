'use client'

import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import {MediaGrid} from "../../../components/ui/MediaGrid/MediaGrid"
import {FilterPanel} from "../../../components/ui/FilterPanel/FilterPanel"
import {Pagination} from "../../../components/ui/Pagination/Pagination"
import {useAppDispatch, useAppSelector} from "../../../stores/hooks"
import {resetFilmFilters, setFilmFilter} from "../../../stores/slices/films/filmFilters.slice"
import {filmsApi, useGetTopMoviesQuery} from "../../api/films/films.api"
import {useGenres} from "../../../hooks/useGenges"

export default function FilmsPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch()
    const filters = useAppSelector(state => state.filmFilters)

    const { genres: apiGenres } = useGenres()

    const genresToUse = apiGenres
    const [page, setPage] = useState(1)
    const [isLoadingPreview, setIsLoadingPreview] = useState(false)
    const [previewCount, setPreviewCount] = useState<number | null>(null)
    const [appliedFilters, setAppliedFilters] = useState<any>({})


    useEffect(() => {
        const params = new URLSearchParams(searchParams)
        const initialFilters: any = {}

        params.forEach((value, key) => {
            if (key === 'year') {
                const [from, to] = value.split('-')
                initialFilters.year = {from: from || '', to: to || ''}
            } else if (key === 'genres') {
                initialFilters.genres = value.split(',')
            } else if (key === 'rating') {
                initialFilters.rating = value
            } else if (key === 'top250') {
                initialFilters.top250 = value === 'true'
            }
        })

        setAppliedFilters(initialFilters)
        dispatch(setFilmFilter(initialFilters))
    }, [dispatch, searchParams])

    const queryParams = useMemo(() => {
        const params: any = {
            limit: 36,
            page,
            notNullFields: 'poster.url',
            sortField: 'votes.kp',
            sortType: '-1',
            type: 'movie'
        }

        if (appliedFilters?.year?.from || appliedFilters?.year?.to) {
            params.year = `${appliedFilters.year.from || ''}-${appliedFilters.year.to || ''}`
        }

        if (appliedFilters?.genres?.length) {
            params['genres.name'] = appliedFilters.genres
        }

        if (appliedFilters?.rating) {
            const [from] = appliedFilters.rating.split('-')
            params['rating.imdb'] = `${from}-10`
        }

        if (appliedFilters?.top250) {
            params['top250'] = { $exists: true, $lte: 250 };
        }

        return params
    }, [appliedFilters, page])

    const {data, isLoading, error, isFetching} = useGetTopMoviesQuery(queryParams)

    const updatePreviewCount = useCallback(async (filters: any) => {
        setIsLoadingPreview(true)
        try {
            const previewParams = {
                limit: 1,
                page: 1,
                notNullFields: 'poster.url',
                ...(filters?.year?.from || filters?.year?.to ? {
                    year: `${filters.year.from || ''}-${filters.year.to || ''}`
                } : {}),
                ...(filters?.genres?.length ? {'genres.name': filters.genres} : {}),
                ...(filters?.rating ? {
                    'rating.imdb': filters.rating.includes('-')
                        ? filters.rating
                        : `${filters.rating}-10`
                } : {}),
                ...(filters?.top250 ? {top250: '!null', 'top250': '<=250'} : {})
            }

            const result = await dispatch(
                filmsApi.endpoints.getTopMovies.initiate(previewParams)
            ).unwrap()

            setPreviewCount(result.total)
        } catch (error) {
            console.error('Preview error:', error)
            setPreviewCount(null)
        } finally {
            setIsLoadingPreview(false)
        }
    }, [dispatch])

    const handleFilterChange = useCallback((newFilters: Partial<typeof filters>) => {
        const updatedFilters = {...filters, ...newFilters}
        dispatch(setFilmFilter(updatedFilters))
        updatePreviewCount(updatedFilters)
    }, [dispatch, filters, updatePreviewCount])

    const handleApplyFilters = useCallback(() => {
        const params = new URLSearchParams()

        if (filters.year?.from || filters.year?.to) {
            params.set('year', `${filters.year.from || ''}-${filters.year.to || ''}`)
        }

        if (filters.genres?.length) {
            params.set('genres', filters.genres.join(','))
        }

        if (filters.rating) {
            params.set('rating', filters.rating)
        }

        if (filters.top250) {
            params.set('top250', 'true')
        }

        setAppliedFilters(filters)
        setPage(1)
        router.replace(`/films?${params.toString()}`, {scroll: false})
    }, [filters, router])

    const handleResetAll = useCallback(() => {
        setPage(1)
        setAppliedFilters({})
        dispatch(resetFilmFilters())
        router.replace('/films', {scroll: false})
    }, [dispatch, router])

    return (
        <div className="">
            <FilterPanel
                onFilterChange={handleFilterChange}
                onResetAll={handleResetAll}
                onApplyFilters={handleApplyFilters}
                previewCount={previewCount}
                genres={genresToUse}
                isLoadingPreview={isLoadingPreview}
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