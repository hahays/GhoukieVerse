import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface RangeSelectProps {
    value: { from: string; to: string };
    onChange: (value: { from: string; to: string }) => void;
    className?: string;
    label?: string;
    minYear?: number;
    maxYear?: number;
}

export const RangeSelect: React.FC<RangeSelectProps> = ({
                                                            value = { from: '', to: '' },
                                                            onChange,
                                                            className = '',
                                                            label = 'Год',
                                                            minYear = 1870,
                                                            maxYear = new Date().getFullYear(),
                                                        }) => {
    const [open, setOpen] = useState(false);
    const [tempValue, setTempValue] = useState(value);
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const years = Array.from(
        { length: maxYear - minYear + 1 },
        (_, i) => (maxYear - i).toString()
    );

    useEffect(() => {
        if (open) setTempValue(value);
    }, [open, value]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node) &&
                (!dropdownRef.current || !dropdownRef.current.contains(e.target as Node))) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleApply = () => {
        onChange(tempValue);
        setOpen(false);
    };

    const handleReset = () => {
        setTempValue({ from: '', to: '' });
    };

    const handleSelect = (key: 'from' | 'to', val: string) => {
        setTempValue(prev => ({ ...prev, [key]: val }));
    };

    const displayText = value.from || value.to
        ? `${value.from || '...'} — ${value.to || '...'}`
        : label;

    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

    useEffect(() => {
        if (open && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY + 8,
                left: rect.left + window.scrollX,
                width: rect.width
            });
        }
    }, [open]);

    return (
        <>
            <div ref={containerRef} className={`relative w-full min-w-[180px] ${className}`}>
                <div className="relative rounded-lg p-[1.5px] bg-gradient-to-r from-[#000000] to-[#666666]">
                    <div className="bg-ghoukie-green rounded-[calc(0.5rem-1.5px)] p-[2px]">
                        <div
                            className="bg-ghoukie-white rounded-[calc(0.5rem-3.5px)] h-full cursor-pointer"
                            onClick={() => setOpen(!open)}
                        >
                            <div className="w-full pl-4 pr-8 py-2 flex justify-between items-center">
                                <span className="truncate text-[#1A1A1A]">{displayText}</span>
                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                                        <path
                                            d="M1 1L6 6L11 1"
                                            stroke="#1A1A1A"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            className={`transition-transform ${open ? 'rotate-180' : ''}`}
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {open && createPortal(
                <div
                    ref={dropdownRef}
                    className="fixed z-[9999]"
                    style={{
                        top: `${position.top}px`,
                        left: `${position.left}px`,
                        width: `${position.width}px`
                    }}
                >
                    <div className="rounded-lg p-[1.5px] bg-gradient-to-r from-[#000000] to-[#666666]">
                        <div className="bg-ghoukie-green rounded-[calc(0.5rem-1.5px)] p-[2px]">
                            <div className="bg-ghoukie-white rounded-[calc(0.5rem-3.5px)] p-3">
                                <div className="flex gap-3">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium mb-1 text-[#1A1A1A]">От</label>
                                        <div className="max-h-[180px] overflow-y-auto border border-ghoukie-gray rounded">
                                            {years.map(year => (
                                                <div
                                                    key={`from-${year}`}
                                                    onClick={() => handleSelect('from', year)}
                                                    className={`px-3 py-1 cursor-pointer hover:bg-ghoukie-green/10 ${
                                                        tempValue.from === year ? 'bg-ghoukie-green text-white' : 'text-[#1A1A1A]'
                                                    }`}
                                                >
                                                    {year}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <label className="block text-sm font-medium mb-1 text-[#1A1A1A]">До</label>
                                        <div className="max-h-[180px] overflow-y-auto border border-ghoukie-gray rounded">
                                            {years.map(year => (
                                                <div
                                                    key={`to-${year}`}
                                                    onClick={() => handleSelect('to', year)}
                                                    className={`px-3 py-1 cursor-pointer hover:bg-ghoukie-green/10 ${
                                                        tempValue.to === year ? 'bg-ghoukie-green text-white' : 'text-[#1A1A1A]'
                                                    }`}
                                                >
                                                    {year}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 pt-2 flex justify-between border-t border-ghoukie-gray">
                                    <button
                                        onClick={handleReset}
                                        className="text-sm text-[#1A1A1A] hover:text-ghoukie-dark"
                                    >
                                        Сбросить
                                    </button>
                                    <button
                                        onClick={handleApply}
                                        className="text-sm bg-ghoukie-green text-white px-3 py-1 rounded hover:bg-ghoukie-dark-green"
                                    >
                                        Применить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};