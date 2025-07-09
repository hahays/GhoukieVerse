import React, { useState, useRef, useEffect } from 'react';

interface CollapseProps {
    children: React.ReactNode;
    isOpen: boolean;
    className?: string;
}

export const Collapse = ({ children, isOpen, className = '' }: CollapseProps) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(isOpen ? 'auto' : '0px');

    useEffect(() => {
        if (isOpen) {
            setHeight(`${contentRef.current?.scrollHeight}px`);
            setTimeout(() => setHeight('auto'), 300); // После анимации устанавливаем auto
        } else {
            setHeight(`${contentRef.current?.scrollHeight}px`);
            setTimeout(() => setHeight('0px'), 10);
        }
    }, [isOpen]);

    return (
        <div
            ref={contentRef}
            className={`overflow-hidden transition-all duration-300 ${className}`}
            style={{ height }}
        >
            {children}
        </div>
    );
};