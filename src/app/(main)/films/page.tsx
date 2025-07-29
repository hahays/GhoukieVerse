'use client';

import {useGenres} from "../../../hooks/useGenges";
import {useFilmFilters} from "../../../hooks/useFilmFilters";
import {useFilmFiltersData} from "../../../hooks/useFilmFiltersData";

import {FilterPanelMobile} from "../../../features/filters/films/components/FilterPanelMobile";
import {MediaGrid} from "../../../components/ui/MediaGrid/MediaGrid";
import {Pagination} from "../../../components/ui/Pagination/Pagination";
import {FilterPanelDesktop} from "../../../features/filters/films/components/FilterPanelDesktop";

export default function FilmsPage() {
    const { filters, movies, isLoading, applyFilters, resetAll, setPage } = useFilmFilters();
    const { genres } = useGenres();
    const { ages, popularities, platforms } = useFilmFiltersData();

    return (
        <>
            <FilterPanelDesktop
                filters={filters}
                onFilterChange={applyFilters}
                onResetAll={resetAll}
                genres={genres}
                ages={ages}
                platforms={platforms}
                popularities={popularities}
                isLoadingPreview={isLoading}
                className="max-xl:hidden"
            />

            <FilterPanelMobile mediaType="film" className="xl:hidden" />

            <section className="px-16">
                <MediaGrid
                    movies={movies?.docs ?? []}
                    mediaType="films"
                    isLoading={isLoading}
                />
            </section>

            {movies && movies.pages > 1 && (
                <Pagination
                    currentPage={movies.page}
                    totalPages={movies.pages}
                    onPageChange={setPage}
                />
            )}
        </>
    );
}