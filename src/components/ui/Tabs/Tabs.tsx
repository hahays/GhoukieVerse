import { ButtonToggle } from "../ButtonToggle/ButtonToggle";

interface TabItem {
    value: string;
    label: string;
}

interface TabsProps {
    items: TabItem[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export const Tabs = ({ items, value, onChange, className }: TabsProps) => {
    return (
        <div className={`relative ${className}`}>
            <div className="flex items-center gap-2">
                {items.map((tab) => (
                    <ButtonToggle
                        key={tab.value}
                        active={value === tab.value}
                        onClick={() => onChange(tab.value)}
                        className="min-w-[100px]"
                    >
                        {tab.label}
                    </ButtonToggle>
                ))}
            </div>

            <div className="absolute -bottom-4 left-0 right-0 h-1 bg-ghoukie-black">
                <div
                    className="absolute h-full bg-ghoukie-green transition-all duration-300"
                    style={{
                        width: `${100 / items.length}%`,
                        left: `${(items.findIndex(item => item.value === value) / items.length) * 100}%`
                    }}
                />
            </div>
        </div>
    );
};