import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
    placeholder?: string;
    onSearch: (value: string) => void;
    delay?: number;
}

export const SearchInput = ({
                                placeholder = 'Поиск...',
                                onSearch,
                                delay = 500,
                            }: SearchInputProps) => {
    const [value, setValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (isTyping) {
                onSearch(value);
                setIsTyping(false);
            }
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay, isTyping, onSearch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setIsTyping(true);
    };

    return (
        <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-ghoukie-green"
            />
        </div>
    );
};