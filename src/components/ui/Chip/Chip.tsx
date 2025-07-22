import React from 'react';
import {X} from 'lucide-react';

interface ChipProps {
    label: string;
    onRemove?: () => void;
    className?: string;
}

export const Chip: React.FC<ChipProps> = ({
                                              label,
                                              onRemove,
                                              className = ''
                                          }) => (
    <div className={`
    inline-flex items-center 
    bg-ghoukie-green text-ghoukie-white
   rounded-lg
    px-2 py-2 text-sm
    ${className}
  `}>
        <span className="mr-2">{label}</span>
        <button
            onClick={onRemove}
            className="
          ml-1 flex items-center justify-center
          rounded-full hover:bg-ghoukie-black/10
          p-1 transition-colors
        "
            aria-label={`Удалить фильтр ${label}`}
        >
            <X className="h-3.5 w-3.5"/>
        </button>
    </div>
);