import {FilterValues} from "../../../types/film";
import {FilterOption} from "../../../types/general";

export interface FilterPanelProps {
    genres?: FilterOption[];
    years?: FilterOption[];
    ratings?: FilterOption[];
    countries?: FilterOption[];
    durations?: FilterOption[];
    dates?: FilterOption[];
    tags?: FilterOption[];
    onFilterChange?: (filters: FilterValues) => void;
    platforms: Array<{ value: string; label: string }>;
    onYearChange: (range: { from: string; to: string }) => void;
    onGenreChange: (genre: string) => void;
    className?: string;
    onApplyFilters?: () => void
    previewCount?: number | null
    isApplying?: boolean
    isLoadingPreview?: boolean;
}