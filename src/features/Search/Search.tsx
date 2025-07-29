import React, { useCallback, useState, useEffect } from "react";
import debounce from "lodash.debounce";
import { FiSearch } from "react-icons/fi";
import { Input } from "../../components/ui/Input/Input";


interface SearchProps extends Omit<React.ComponentProps<typeof Input>, "onChange" | "value"> {
    value?: string;
    onChange?: (value: string) => void;
    debounceTime?: number;
    inputClassName?: string;
}

export const Search: React.FC<SearchProps> = ({
                                                  value = "",
                                                  onChange = () => {},
                                                  debounceTime = 300,
                                                  ...props
                                              }) => {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const debouncedOnChange = useCallback(
        debounce((val: string) => {
            onChange(val);
        }, debounceTime),
        [debounceTime, onChange]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);
        debouncedOnChange(newValue);
    };

    const handleClear = () => {
        setLocalValue("");
        onChange("");
    };

    return (
        <Input
            value={localValue}
            onChange={handleChange}
            rightIcon={!localValue ? <FiSearch size={24} /> : undefined}
            clearable={!!localValue}
            onClear={handleClear}
            placeholder='Найти...'
            className={props.inputClassName}
            {...props}
        />
    );
};