import React, { ReactNode } from 'react';
import {useFilmFilterLogic} from "../../../../hooks/useFilmFilterLogic";
import { FILTER_OPTIONS } from '../../../../lib/utils/filterOptions';
import {useGenres} from "../../../../hooks/useGenges";
import {useFilmFiltersData} from "../../../../hooks/useFilmFiltersData";
import {useGetStudiosQuery} from "../../../../app/api/films/filmFilters.api";

export type FilterPanelCoreProps = {
    children: (ctx: ReturnType<typeof useFilmFilterLogic> & {
        options: typeof FILTER_OPTIONS;
        genres: { value: string; label: string }[];
        studios: { value: string; label: string }[];
        platforms: { value: string; label: string }[];
        countries: { value: string; label: string }[];
        isLoading: boolean;
    }) => ReactNode;
};

export const FilterPanelCore: React.FC<FilterPanelCoreProps> = ({ children }) => {
    const logic = useFilmFilterLogic();
    const { genres } = useGenres();
    const { platforms, countries, isLoading } = useFilmFiltersData();
    const { data: studios = [] } = useGetStudiosQuery();

    return (
        <>
            {children({
                ...logic,
                options: FILTER_OPTIONS,
                genres,
                platforms,
                countries,
                studios,
                isLoading,
            })}
        </>
    );
};