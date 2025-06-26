'use client'

import React from 'react';
import { MediaGrid } from "../../../components/ui/MediaGrid/MediaGrid";
import { useMovieFilters } from "../../../hooks/useMovieFilters";
import { FilterPanel } from "../../../components/ui/FilterPanel/FilterPanel";
import { Pagination } from "../../../components/ui/Pagination/Pagination";
import {MovieFilterParams} from "../../../types/film";

export default function FilmsPage() {
    const {
        movies,
        isLoading,
        error,
        applyFilters,
        filterOptions
    } = useMovieFilters();

    const handleFilterChange = (filters: any) => {
        const apiFilters: MovieFilterParams = {
            years: filters.year ? [parseInt(filters.year)] : undefined,
            genres: filters.genre ? [filters.genre] : undefined,
            countries: filters.country ? [filters.country] : undefined,
            rating: filters.rating,
        };

        applyFilters(apiFilters);
    };

    if (isLoading && !movies.length) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="">
            <FilterPanel
                genres={filterOptions.genres}
                countries={filterOptions.countries}
                onFilterChange={handleFilterChange}
            />

            <section className="px-16">
                <MediaGrid
                    movies={movies}
                    mediaType="films"
                    isLoading={isLoading}
                    error={error}
                />
            </section>

            <Pagination movies={movies}/>
        </div>
    );
}