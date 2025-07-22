import React from "react";
import {Button} from "../Button";
import {ButtonProps} from "../Button/Button";


interface ButtonToggleProps extends Pick<ButtonProps, 'variant' | 'size'> {
    label?: string;
    active: boolean;
    onClick: () => void;
    className?: string;
    children?: React.ReactNode;
    useTabsVariant?: boolean;
    activeWrapperClass?: string;
    inactiveWrapperClass?: string;
    activeInnerClass?: string;
    inactiveInnerClass?: string;
    activeButtonClass?: string;
    inactiveButtonClass?: string;
    textSize?: 'sm' | 'base' | 'lg' | 'xl';
}

export const ButtonToggle: React.FC<ButtonToggleProps> = ({
                                                              label,
                                                              active,
                                                              onClick,
                                                              className = '',
                                                              children,
                                                              size,
                                                              useTabsVariant = false,
                                                              activeWrapperClass = 'bg-ghoukie-green',
                                                              inactiveWrapperClass = 'bg-gradient-to-r from-[#000000] to-[#666666]',
                                                              activeInnerClass = 'bg-ghoukie-green',
                                                              inactiveInnerClass = 'bg-ghoukie-green',
                                                              activeButtonClass = 'bg-ghoukie-black text-ghoukie-green',
                                                              inactiveButtonClass = 'bg-ghoukie-black text-ghoukie-white hover:opacity-90',
    textSize = "lg",
                                                          }) => {


    return (
        <div className={`shrink-0 flex-1 ${className}`}>
            <div className={`relative rounded-lg p-[1.5px] ${
                active ? activeWrapperClass : inactiveWrapperClass
            }`}>
                <div className={`rounded-[calc(0.5rem-1.5px)] p-[2px] ${
                    active ? activeInnerClass : inactiveInnerClass
                }`}>
                    <Button
                        variant={useTabsVariant ? 'tabs' : 'toggle'}
                        size={size}
                        active={active}
                        onClick={onClick}
                        textSize={textSize}
                        className={`whitespace-nowrap w-full py-2 px-4 rounded-[calc(0.5rem-3.5px)] transition-all ${
                            active ? activeButtonClass : inactiveButtonClass
                        }`}
                    >
                        {children || label}
                    </Button>
                </div>
            </div>
        </div>
    );
};