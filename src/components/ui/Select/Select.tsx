
import { useState } from "react";

interface Option {
    value: string;
    label: string;
}

interface ActionToggleGroupProps {
    options: Option[];
    initial?: string | null;
    onChange?: (value: string | null) => void;
}

export const ActionToggleGroup = ({
                                      options,
                                      initial = null,
                                      onChange
                                  }: ActionToggleGroupProps) => {
    const [selected, setSelected] = useState<string | null>(initial);

    const handleClick = (value: string) => {
        const newValue = selected === value ? null : value;
        setSelected(newValue);
        onChange?.(newValue);
    };

    return (
        <div className="relative w-full max-w-md mx-auto">
            <div className="relative rounded-lg p-[1.5px] bg-gradient-to-r from-[#000000] to-[#666666]">
                <div className="bg-[#A1D07E] rounded-[calc(0.5rem-1.5px)] p-[2px]">
                    <div className="bg-[#ECFAEB] rounded-[calc(0.5rem-3.5px)] h-full px-1 py-1 flex gap-2 justify-center">
                        {options.map((option) => (
                            <Button
                                key={option.value}
                                variant="ghostToggle"
                                active={selected === option.value}
                                onClick={() => handleClick(option.value)}
                                className="w-full"
                            >
                                {option.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
