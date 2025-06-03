// components/RatingDiagram.tsx
import { StarIcon } from 'lucide-react';

interface RatingDiagramProps {
    rating: number;
}

export const RatingDiagram = ({ rating }: RatingDiagramProps) => {
    return (
        <div className="mt-6 pt-6 border-t border-gray-700">
            <h3 className="text-2xl flex justify-center font-bold font-victor text-center">
                СРЕДНИЙ РЕЙТИНГ
            </h3>
            <h2 className="text-3xl flex justify-center font-bold font-victor mb-4 text-center">
                {rating.toFixed(1)}
            </h2>

            <div className="flex items-end justify-center h-20 gap-1">
                <div className="flex flex-col items-center h-full justify-end mr-2">
                    <StarIcon className="w-5 h-5 text-ghoukie-light-green fill-ghoukie-green" />
                </div>

                {[10, 70, 20, 80, 70, 20, 10, 25, 10].map((heightPercent, index) => (
                    <div key={index} className="flex flex-col items-center h-full justify-end">
                        <div
                            className="w-6 rounded bg-ghoukie-white transition-all duration-300"
                            style={{ height: `${heightPercent}%` }}
                        ></div>
                    </div>
                ))}

                <div className="flex flex-col items-center h-full justify-end ml-2">
                    <div className="flex mb-1">
                        <StarIcon className="w-5 h-5 text-ghoukie-light-green fill-ghoukie-green" />
                    </div>
                    <div className="flex mb-1">
                        <StarIcon className="w-5 h-5 text-ghoukie-light-green fill-ghoukie-green" />
                        <StarIcon className="w-5 h-5 text-ghoukie-light-green fill-ghoukie-green" />
                    </div>
                    <div className="flex">
                        <StarIcon className="w-5 h-5 text-ghoukie-light-green fill-ghoukie-green" />
                        <StarIcon className="w-5 h-5 text-ghoukie-light-green fill-ghoukie-green" />
                        <StarIcon className="w-5 h-5 text-ghoukie-light-green fill-ghoukie-green" />
                    </div>
                </div>
            </div>
        </div>
    );
};