import { useState } from "react";
import {Button} from "../Button";

interface ActionToggleGroupProps {
    options: { value: string; label: string }[];
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
        <div className="relative w-full max-w-md">
            <div className="relative rounded-lg p-[1.5px] bg-gradient-to-r from-[#000000] to-[#666666]">
                <div className="bg-ghoukie-green shadow-figma rounded-[calc(0.5rem-1.5px)] py-1">
                    <div className="bg-ghoukie-green  rounded-[calc(0.5rem-3.5px)] gap-x-1.5 flex justify-center">
                        {options.map((option) => {
                            const isActive = selected === option.value;
                            return (
                                <Button
                                    key={option.value}
                                    size="ghostToggle"
                                    variant="ghostToggle"
                                    active={isActive}
                                    onClick={() => handleClick(option.value)}
                                    className=" font-victor"
                                >
                                    {option.label}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
