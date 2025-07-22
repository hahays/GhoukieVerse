import React from 'react';

interface Option {
    label: string;
    value: string;
}

interface CheckboxSelectProps {
    label: string;
    options: Option[];
    selected?: string[];
    onChange: (selected: string[]) => void;
    columns?: number;
}

export const CheckboxSelect: React.FC<CheckboxSelectProps> = ({
                                                                  label,
                                                                  options,
                                                                  selected = [],
                                                                  onChange,
                                                                  columns = 2,
                                                              }) => {
    const handleToggle = (value: string) => {
        const newSelected = selected.includes(value)
            ? selected.filter(v => v !== value)
            : [...selected, value];
        onChange(newSelected);
    };

    const columnSize = Math.ceil(options.length / columns);
    const columnsData = Array.from({ length: columns }, (_, i) =>
        options.slice(i * columnSize, (i + 1) * columnSize)
    );

    return (
        <div className="mb-4">
            <h3 className="text-center font-medium mb-3 text-ghoukie-gray-100">{label}</h3>

            <div className={`grid grid-cols-${columns} gap-4`}>
                {columnsData.map((column, colIndex) => (
                    <div key={colIndex} className="space-y-2">
                        {column.map(opt => (
                            <label
                                key={opt.value}
                                className={`
                  flex items-center gap-2 
                  p-2 rounded-lg border 
                  transition-colors duration-200
                  ${selected.includes(opt.value)
                                    ? 'border-ghoukie-green bg-ghoukie-green/10'
                                    : 'border-ghoukie-gray-50 hover:border-ghoukie-green/50'}
                `}
                            >
                                <input
                                    type="checkbox"
                                    checked={selected.includes(opt.value)}
                                    onChange={() => handleToggle(opt.value)}
                                    className={`
                    appearance-none w-4 h-4 rounded-sm border-2
                    ${selected.includes(opt.value)
                                        ? 'bg-ghoukie-green border-ghoukie-green'
                                        : 'border-ghoukie-gray-50'}
                    relative
                    after:content-[""] after:absolute after:left-1/2 after:top-1/2 
                    after:-translate-x-1/2 after:-translate-y-1/2
                    after:w-2 after:h-2 after:bg-white after:rounded-sm
                  `}
                                />
                                <span className="text-sm text-ghoukie-gray-100">{opt.label}</span>
                            </label>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};


export const mockPlatforms = [
    { value: 'netflix', label: 'Netflix' },
    { value: 'amazon', label: 'Amazon' },
    { value: 'appletv', label: 'Apple TV' },
    { value: 'okko', label: 'Okko' },
    { value: 'premier', label: 'Premier' },
    { value: 'ivi', label: 'IVI' },
];

export const mockAgeRatings = [
    { value: '18', label: '18+' },
    { value: '16', label: '16+' },
    { value: '12', label: '12+' },
    { value: '6', label: '6+' },
    { value: '0', label: '0+' },
];