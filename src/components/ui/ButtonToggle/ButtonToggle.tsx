import React from "react";

interface FilterButtonToggleProps {
    label: string;
    active: boolean;
    onClick: () => void;
}

export const ButtonToggle: React.FC<FilterButtonToggleProps> = ({
                                                                          label,
                                                                          active,
                                                                          onClick
                                                                      }) => {
    return (
        <div className="shrink-0 flex-1">
            <div className={`relative rounded-lg p-[1.5px] ${
                active
                    ? 'bg-[#A1D07E]'
                    : 'bg-gradient-to-r from-[#000000] to-[#666666]'
            }`}>


                <div className="bg-[#A1D07E] rounded-[calc(0.5rem-1.5px)] p-[2px]">

                    <button
                        onClick={onClick}
                        className={`whitespace-nowrap flex-1 w-full  py-2 px-3 rounded-[calc(0.5rem-3.5px)] transition-all ${
                            active
                                ? 'bg-[#1C1D1F] text-[#A1D07E]'
                                : 'bg-[#1C1D1F] text-[#ECFAEB] hover:opacity-90'
                        }`}
                    >
                        {label}
                    </button>
                </div>
            </div>
        </div>
    );
};