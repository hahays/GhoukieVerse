import {StarIcon} from "lucide-react";

export function RatingChart() {
    return (
        <div className="bg-ghoukie-gray p-4 rounded-lg mb-4">
            <h3 className="font-bold mb-3">Средний рейтинг: 4.5</h3>
            <div className="h-2 bg-ghoukie-dark-gray rounded-full mb-2">
                <div className="h-2 bg-ghoukie-green rounded-full w-3/4"></div>
            </div>
            <div className="flex justify-between text-xs text-ghoukie-light-gray mb-4">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
            </div>
            <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                ))}
            </div>
        </div>
    );
}