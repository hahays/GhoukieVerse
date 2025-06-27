'use client'

import React, {useState} from 'react';
import {MediaGrid} from "../../../components/ui/MediaGrid/MediaGrid";
import {FilterPanel} from "../../../components/ui/FilterPanel/FilterPanel";
import {Pagination} from "../../../components/ui/Pagination/Pagination";
import {useMovies} from "../../../hooks/useMovies";

export default function FilmsPage() {
    const [filters, setFilters] = useState({
        year: {from: '', to: ''}
    });

    const {movies, isLoading, error, loadMore, hasMore} = useMovies(filters);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    if (isLoading && !movies.length) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="">
            <FilterPanel
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