import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    clearable?: boolean;
    onClear?: () => void;
    className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            value = "",
            onChange,
            leftIcon,
            rightIcon,
            clearable = true,
            onClear,
            className = "",
            ...props
        },
        ref
    ) => {
        const showClearButton = clearable && value.length > 0 && onClear;
        const showRightIcon = rightIcon && !showClearButton;

        return (
            <div className="relative">
                {leftIcon && (
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[24px]">
            {leftIcon}
          </span>
                )}
                <input
                    ref={ref}
                    className={`w-full py-2 h-16 text-2xl ${leftIcon ? "pl-12" : "pl-4"} ${
                        showClearButton || rightIcon ? "pr-12" : "pr-4"
                    } bg-ghoukie-black rounded-md focus:outline-none focus:ring-2 focus:ring-ghoukie-green placeholder:text-ghoukie-white ${className}`}
                    value={value}
                    onChange={onChange}
                    {...props}
                />
                {showClearButton && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-ghoukie-white hover:text-ghoukie-white text-2xl"
                    >
                        ×
                    </button>
                )}
                {showRightIcon && (
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-ghoukie-white text-2xl">
            {rightIcon}
          </span>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";