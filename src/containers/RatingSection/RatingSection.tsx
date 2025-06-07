import {StarIcon} from "../../components/ui/StarIcon";

interface RatingSectionProps {
    rating: number;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function RatingSection({rating, size = "md", className = ""}: RatingSectionProps) {
    const sizes = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-14 h-14",
    };

    const sizeClass = sizes[size];

    return (
        <div className={`flex justify-center gap-2 pt-2 items-center ${className}`}>
            {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= Math.floor(rating);
                const isHalf = !isFilled && star - 0.5 <= rating;
                const widthClass = isFilled ? "w-full" : isHalf ? "w-1/2" : "w-0";

                return (
                    <div key={star} className="relative">
                        <StarIcon className={sizeClass} filled={false}/>
                        <div className={`absolute top-0 left-0 overflow-hidden ${widthClass}`}>
                            <StarIcon className={sizeClass} filled/>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}