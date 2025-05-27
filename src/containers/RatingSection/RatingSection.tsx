import {StarIcon} from "lucide-react";

export function RatingSection({ rating }: { rating: string }) {
    return (
        <div className="bg-ghoukie-gray p-4 rounded-lg mb-4">
            <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{rating}</span>
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                </div>
            </div>
        </div>
    );
}