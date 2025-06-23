import {ButtonToggle} from "../ButtonToggle/ButtonToggle";
import {ButtonProps} from "../Button/Button";


interface TabItem {
    value: string;
    label: string;
}

interface TabsProps {
    items: TabItem[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
    variant?: 'default' | 'no-line';
    buttonVariant?: ButtonProps['variant'];
    buttonSize?: ButtonProps['size'];
}

export const Tabs = ({
                         items,
                         value,
                         onChange,
                         className,
                         variant = "default",
                         buttonVariant = 'toggle',
                         buttonSize,
                     }: TabsProps) => {
    return (
        <div className={`relative ${className}`}>
            <div className="flex items-center gap-2">
                {items.map((tab) => (
                    <ButtonToggle
                        key={tab.value}
                        active={value === tab.value}
                        onClick={() => onChange(tab.value)}
                        className="min-w-[100px]"
                        variant={buttonVariant}
                        size={buttonSize}
                        useTabsVariant={true}
                        activeWrapperClass = 'bg-ghoukie-black'
                    inactiveWrapperClass = 'bg-gradient-to-r from-[#000000] to-[#666666]'
                    activeInnerClass = 'bg-ghoukie-green'
                    inactiveInnerClass = 'bg-ghoukie-green'
                    activeButtonClass = 'bg-ghoukie-black text-ghoukie-black'
                    inactiveButtonClass = 'bg-ghoukie-black text-ghoukie-black hover:opacity-80'
                    >
                        {tab.label}
                    </ButtonToggle>
                ))}
            </div>

            {variant === 'default' && (
                <div className="absolute -bottom-4 left-0 right-0 h-1 bg-ghoukie-black">
                    <div
                        className="absolute h-full bg-ghoukie-green transition-all duration-300"
                        style={{
                            width: `${100 / items.length}%`,
                            left: `${(items.findIndex(item => item.value === value) / items.length) * 100}%`
                        }}
                    />
                </div>
            )}
        </div>
    );
};