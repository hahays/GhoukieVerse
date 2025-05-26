import React from 'react';

interface CustomSelectProps {
    options: string[];
    className?: string;
}

export const Select: React.FC<CustomSelectProps> = ({options, className = ''}) => {
    return (
        <div className={`relative w-full min-w-[180px] ${className}`}>

            <div className="relative rounded-lg p-[1.5px] bg-gradient-to-r from-[#000000] to-[#666666]">

                <div className="bg-[#A1D07E] rounded-[calc(0.5rem-1.5px)] p-[2px]">

                    <div className="bg-[#ECFAEB] rounded-[calc(0.5rem-3.5px)] h-full">

                        <select
                            className="w-full pl-4 pr-8 py-2 bg-transparent appearance-none focus:outline-none text-[#1A1A1A] rounded-[calc(0.5rem-3.5px)]"
                        >
                            {options.map((option) => (
                                <option key={option} value={option} className="bg-[#ECFAEB] text-[#1A1A1A]">
                                    {option}
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