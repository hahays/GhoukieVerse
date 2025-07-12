import {useState} from "react";
import {Button} from "../Button";

interface ActionToggleGroupProps {
    options: { value: string; label: string }[];
    initial?: string | null;
    onChange?: (value: string | null) => void;
    wrapperClass?: string;
    gradientClass?: string;
    outerBgClass?: string;
    innerBgClass?: string;
    buttonVariant?: 'ghostToggle' | 'toggle' | string;
    buttonSize?: string;
    buttonClassName?: string;
}

export const ActionToggleGroup = ({
                                      options,
                                      initial = null,
                                      onChange,
                                      wrapperClass = "relative w-full max-w-md",
                                      gradientClass = "bg-gradient-to-r from-[#000000] to-[#666666]",
                                      outerBgClass = "bg-ghoukie-green shadow-figma",
                                      innerBgClass = "bg-ghoukie-green",
                                      buttonVariant = "ghostToggle",
                                      buttonSize = "ghostToggle",
                                      buttonClassName = "",
                                  }: ActionToggleGroupProps) => {
    const [selected, setSelected] = useState<string | null>(initial);

    const handleClick = (value: string) => {
        const newValue = selected === value ? null : value;
        setSelected(newValue);
        onChange?.(newValue);
    };

    return (
        <div className={wrapperClass}>
            <div className={`relative rounded-lg p-[1.5px] ${gradientClass}`}>
                <div className={`${outerBgClass} rounded-[calc(0.5rem-1.5px)]`}>
                    <div className={`${innerBgClass} rounded-[calc(0.5rem-3.5px)] gap-x-1.5 flex justify-center`}>
                        {options.map((option) => {
                            const isActive = selected === option.value;
                            return (
                                <Button
                                    key={option.value}
                                    size={buttonSize}
                                    variant={buttonVariant}
                                    active={isActive}
                                    onClick={() => handleClick(option.value)}
                                    className={`font-victor ${buttonClassName}`}
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