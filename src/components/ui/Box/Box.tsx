import React, { useState, ReactNode } from "react";

interface BoxProps {
    children: ReactNode;
}

export const Box: React.FC<BoxProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="bg-gray-800 rounded-lg p-4 mb-4 shadow-lg">
            <button
                className="flex items-center justify-center w-6 h-6 bg-gray-700 rounded-full mb-2"
                onClick={() => setIsOpen((open) => !open)}
                aria-label={isOpen ? "Collapse" : "Expand"}
            >
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && children}
        </div>
    );
};