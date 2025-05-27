import {EyeIcon, HeartIcon} from "@heroicons/react/24/outline";
import {BookmarkIcon} from "lucide-react";

export function StatsSection() {
    const stats = [
        { icon: <EyeIcon className="w-4 h-4" />, label: "Просмотрело", value: "1.2M" },
        { icon: <BookmarkIcon className="w-4 h-4" />, label: "В списках", value: "450K" },
        { icon: <HeartIcon className="w-4 h-4" />, label: "Избранное", value: "320K" },
    ];

    return (
        <div className="bg-ghoukie-gray p-4 rounded-lg">
            {stats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                        {stat.icon}
                        <span className="text-sm">{stat.label}</span>
                    </div>
                    <span className="font-medium">{stat.value}</span>
                </div>
            ))}
        </div>
    );
}