'use client'

import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import {MediaGrid} from "../../../components/ui/MediaGrid/MediaGrid"
import {FilterPanel} from "../../../components/ui/FilterPanel/FilterPanel"
import {Pagination} from "../../../components/ui/Pagination/Pagination"
import {useAppDispatch, useAppSelector} from "../../../stores/hooks"
import {resetFilmFilters, setFilmFilter} from "../../../stores/slices/films/filmFilters.slice"
import {filmsApi, useGetTopMoviesQuery} from "../../api/films/films.api"

export default function FilmsPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch()
    const filters = useAppSelector(state => state.filmFilters)

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
            } else {
                initialFilters[key] = value
            }
        })

        if (Object.keys(initialFilters).length > 0) {
            setAppliedFilters(initialFilters)
            dispatch(setFilmFilter(initialFilters))
        } else {
            setAppliedFilters({})
            updatePreviewCount({})
        }
    }, [dispatch, searchParams])

    const queryParams = useMemo(() => {
        const params: any = {
            limit: 36,
            page,
        }

        if (appliedFilters?.year?.from || appliedFilters?.year?.to) {
            params.year = `${appliedFilters.year.from || ''}-${appliedFilters.year.to || ''}`
        }

        if (appliedFilters?.genres?.length) {
            params['genres.name'] = appliedFilters.genres
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
                ...(filters?.year?.from || filters?.year?.to ? {
                    year: `${filters.year.from || ''}-${filters.year.to || ''}`
                } : {}),
                ...(filters?.genres?.length ? {'genres.name': filters.genres} : {}),
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

    const handleFilterChange = useCallback((newFilters: Partial<typeof appliedFilters>) => {
        const updatedFilters = {...filters, ...newFilters}
        dispatch(setFilmFilter(updatedFilters))
        updatePreviewCount(updatedFilters)
    }, [dispatch, filters, updatePreviewCount])

    const handleApplyFilters = useCallback(() => {
        setAppliedFilters(filters)
        setPage(1)

        const params = new URLSearchParams()
        if (filters.year?.from || filters.year?.to) {
            params.set('year', `${filters.year.from || ''}-${filters.year.to || ''}`)
        }
        if (filters.genres?.length) {
            params.set('genres', filters.genres.join(','))
        }

        router.replace(`/films?${params.toString()}`, {scroll: false})
    }, [filters, router])

    const handleResetAll = useCallback(() => {
        setPage(1)
        setAppliedFilters({})
        dispatch(resetFilmFilters())
        updatePreviewCount({})
        router.replace('/films', {scroll: false})
    }, [dispatch, router, updatePreviewCount])

    return (
        <div className="">
            <FilterPanel
                onFilterChange={handleFilterChange}
                onResetAll={handleResetAll}
                onApplyFilters={handleApplyFilters}
                previewCount={previewCount}
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