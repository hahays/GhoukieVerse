export interface FilterOption {
    value: string;
    label: string;
}

export interface FilterValues {
    watched: boolean;
    action: boolean;
    year: string | { from: string; to: string };
}

export interface FilterPanelProps {
    genres?: FilterOption[];
    years?: FilterOption[];
    ratings?: FilterOption[];
    platforms?: FilterOption[];
    countries?: FilterOption[];
    durations?: FilterOption[];
    dates?: FilterOption[];
    tags?: FilterOption[];
    onFilterChange?: (filters: FilterValues) => void;
    className?: string;
}