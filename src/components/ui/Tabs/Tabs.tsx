import {Button} from "../Button";


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
        <div className={`flex items-center gap-6 ${className}`}>
            <div className="flex gap-1">
                {items.map(tab => (
                    <div key={tab.value} className="relative">
                        <Button
                            variant="toggle"
                            size="toggle"
                            active={value === tab.value}
                            onClick={() => onChange(tab.value)}
                            className="px-4 py-1 text-base"
                        >
                            {tab.label}
                        </Button>
                        {value === tab.value && (
                            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-ghoukie-green"></span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};