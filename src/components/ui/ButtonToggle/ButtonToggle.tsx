// components/ui/ButtonToggle.tsx
import React from "react";
import {Button} from "../Button";


interface ButtonToggleProps {
    label?: string;
    active: boolean;
    onClick: () => void;
    className?: string;
    children?: React.ReactNode;
}

export const ButtonToggle: React.FC<ButtonToggleProps> = ({
                                                              label,
                                                              active,
                                                              onClick,
                                                              className = '',
                                                              children
                                                          }) => {
    return (
        <div className={`shrink-0 flex-1 ${className}`}>
            <div className={`relative rounded-lg p-[1.5px] ${
                active
                    ? 'bg-[#A1D07E]'
                    : 'bg-gradient-to-r from-[#000000] to-[#666666]'
            }`}>
                <div className="bg-[#A1D07E] rounded-[calc(0.5rem-1.5px)] p-[2px]">
                    <Button
                        variant="toggle"
                        onClick={onClick}
                        className={`whitespace-nowrap w-full py-2 px-4 rounded-[calc(0.5rem-3.5px)] transition-all text-sm ${
                            active
                                ? 'bg-[#1C1D1F] text-[#A1D07E]'
                                : 'bg-[#1C1D1F] text-[#ECFAEB] hover:opacity-90'
                        }`}
                    >
                        {children || label}
                    </Button>
                </div>
            </div>
        </div>
    );
};