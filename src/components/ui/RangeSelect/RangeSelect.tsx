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
    const [localValue, setLocalValue] = useState(value);
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const years = Array.from(
        { length: maxYear - minYear + 1 },
        (_, i) => (maxYear - i).toString()
    );

    useEffect(() => {
        if (open) {
            setLocalValue(value);
        }
    }, [open, value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [open]);

    const handleApply = () => {
        if (localValue.from !== value.from || localValue.to !== value.to) {
            onChange(localValue);
        }
        setOpen(false);
    };

    const handleReset = () => {
        setLocalValue({ from: '', to: '' });
    };

    const handleSelect = (key: 'from' | 'to', val: string) => {
        // Toggle if clicking the same value
        if (localValue[key] === val) {
            setLocalValue(prev => ({ ...prev, [key]: '' }));
        } else {
            setLocalValue(prev => ({ ...prev, [key]: val }));
        }
    };

    const handleInputChange = (key: 'from' | 'to', e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val === '' || (val.length === 4 && /^\d+$/.test(val))) {
            setLocalValue(prev => ({ ...prev, [key]: val }));
        }
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
                    className="fixed z-[9999] bg-white shadow-lg"
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
                                        <input
                                            type="text"
                                            value={localValue.from}
                                            onChange={(e) => handleInputChange('from', e)}
                                            className="w-full p-2 mb-2 border border-ghoukie-gray rounded"
                                            placeholder="Год от"
                                            maxLength={4}
                                        />
                                        <div className="max-h-[180px] overflow-y-auto border border-ghoukie-gray rounded">
                                            {years.map(year => (
                                                <div
                                                    key={`from-${year}`}
                                                    onClick={() => handleSelect('from', year)}
                                                    className={`px-3 py-1 cursor-pointer hover:bg-ghoukie-green/10 ${
                                                        localValue.from === year ? 'bg-ghoukie-green text-white' : 'text-[#1A1A1A]'
                                                    }`}
                                                >
                                                    {year}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <label className="block text-sm font-medium mb-1 text-[#1A1A1A]">До</label>
                                        <input
                                            type="text"
                                            value={localValue.to}
                                            onChange={(e) => handleInputChange('to', e)}
                                            className="w-full p-2 mb-2 border border-ghoukie-gray rounded"
                                            placeholder="Год до"
                                            maxLength={4}
                                        />
                                        <div className="max-h-[180px] overflow-y-auto border border-ghoukie-gray rounded">
                                            {years.map(year => (
                                                <div
                                                    key={`to-${year}`}
                                                    onClick={() => handleSelect('to', year)}
                                                    className={`px-3 py-1 cursor-pointer hover:bg-ghoukie-green/10 ${
                                                        localValue.to === year ? 'bg-ghoukie-green text-white' : 'text-[#1A1A1A]'
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