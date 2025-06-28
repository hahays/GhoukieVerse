import React from 'react';

interface FilterLabelProps {
    label: string;
    onRemove: () => void;
}

export const FilterLabel = ({ label, onRemove }: FilterLabelProps) => {
    return (
        <div
            className="inline-flex items-center px-3 py-1 rounded-full bg-ghoukie-green text-white text-sm cursor-pointer hover:bg-ghoukie-dark-green transition-colors"
            onClick={onRemove}
        >
            {label}
            <span className="ml-2 text-xs">×</span>
        </div>
    );
};