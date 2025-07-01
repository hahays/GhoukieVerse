import React from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: SelectOption[] | string[];
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}

export const Select: React.FC<CustomSelectProps> = ({
                                                        options,
                                                        value,
                                                        onChange,
                                                        className = ''
                                                    }) => {
    const normalizedOptions = options.map(option => {
        if (typeof option === 'string') {
            return { value: option, label: option };
        }
        return option;
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        // Если выбрано то же значение, что и сейчас - сбрасываем
        onChange?.(selectedValue === value ? '' : selectedValue);
    };

    return (
        <div className={`relative w-full min-w-[180px] ${className}`}>
            <div className="relative rounded-lg p-[1.5px] bg-gradient-to-r from-[#000000] to-[#666666]">
                <div className="bg-ghoukie-green rounded-[calc(0.5rem-1.5px)] p-[2px]">
                    <div className="bg-ghoukie-white rounded-[calc(0.5rem-3.5px)] h-full">
                        <select
                            value={value}
                            onChange={handleChange}
                            className="w-full pl-4 pr-8 py-2 bg-transparent appearance-none focus:outline-none text-[#1A1A1A] rounded-[calc(0.5rem-3.5px)]"
                        >
                            {normalizedOptions.map((option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                    className={`bg-ghoukie-white text-[#1A1A1A] ${
                                        value === option.value ? 'bg-ghoukie-green text-white' : ''
                                    }`}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                                <path d="M1 1L6 6L11 1" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};