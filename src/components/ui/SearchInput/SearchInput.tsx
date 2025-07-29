import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import {Input} from "../Input/Input";
import {FiSearch} from "react-icons/fi";

interface SearchInputProps {
    placeholder?: string;
    value?: string;
    onSearch: (query: string) => void;
    onChange?: (value: string) => void;
    suggestions?: { value: string; label: string }[];
    onSuggestionSelect?: (value: string) => void;
    className?: string;
    delay?: number;
    clearable?: boolean;
}

export const SearchInput = ({
                                placeholder = 'Поиск...',
                                value = '',
                                onSearch,
                                onChange,
                                suggestions = [],
                                onSuggestionSelect,
                                className = '',
                                delay = 500,
                                clearable = true,
                            }: SearchInputProps) => {
    const [inputValue, setInputValue] = useState(value);
    const [localValue, setLocalValue] = useState(value);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const timerRef = useRef<NodeJS.Timeout>();
    const wrapperRef = useRef<HTMLDivElement>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        onChange?.(newValue);

        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            onSearch(newValue);
        }, delay);
    };

    const handleClear = () => {
        setInputValue('');
        onChange?.('');
        onSearch('');
        setShowSuggestions(false);
    };

    const handleSelectSuggestion = (suggestion: { value: string; label: string }) => {
        setInputValue(suggestion.label);
        onChange?.(suggestion.label);
        onSuggestionSelect?.(suggestion.value);
        setShowSuggestions(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const showClearButton = clearable && inputValue.length > 0;

    return (
        <div className={`relative ${className}`} ref={wrapperRef}>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-ghoukie-white" />
                <Input
                    type="text"
                    placeholder={placeholder}
                    value={inputValue}
                    rightIcon={!localValue ? <FiSearch size={20} /> : undefined}
                    onChange={handleChange}
                    onFocus={() => setShowSuggestions(true)}
                    className={`
                        w-full py-2 h-12 text-base
                        pl-10 pr-10
                        bg-ghoukie-black rounded-md
                        focus:outline-none focus:ring-2 focus:ring-ghoukie-green
                        placeholder:text-ghoukie-white
                    `}
                />
                {showClearButton && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-ghoukie-white hover:text-ghoukie-white text-2xl"
                    >
                        <X className="h-6 w-6" />
                    </button>
                )}
            </div>

            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-ghoukie-black border border-ghoukie-gray-50 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {suggestions.map((suggestion) => (
                        <div
                            key={suggestion.value}
                            className="px-4 py-3 hover:bg-ghoukie-gray-50/20 cursor-pointer text-ghoukie-white text-xl"
                            onClick={() => handleSelectSuggestion(suggestion)}
                        >
                            {suggestion.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};