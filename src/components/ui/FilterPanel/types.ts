export interface FilterOption {
    value: string;
    label: string;
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
    onFilterChange?: (filters: Record<string, any>) => void;
    className?: string;
}