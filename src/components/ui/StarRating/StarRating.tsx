import React, {useState} from "react";

interface StarRatingProps {
    maxStars?: number;
    initialRating?: number;
    onRatingChange?: (rating: number) => void;
    size?: "sm" | "md" | "lg";
    showNumber?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
                                                          maxStars = 5,
                                                          initialRating = 0,
                                                          onRatingChange,
                                                          size = "md",
                                                          showNumber = true,
                                                      }) => {
    const [rating, setRating] = useState(initialRating);
    const [hover, setHover] = useState(0);

    const handleClick = (value: number) => {
        setRating(value);
        onRatingChange?.(value);
    };

    return (
        <div className="flex items-center gap-3">
            <div className="flex gap-1">
                {[...Array(maxStars)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <button
                            key={index}
                            onClick={() => handleClick(starValue)}
                            onMouseEnter={() => setHover(starValue)}
                            onMouseLeave={() => setHover(0)}
                            className={`transition-all duration-150 ${
                                starValue <= (hover || rating)
                                    ? "text-yellow-400 scale-110"
                                    : "text-gray-300"
                            } ${
                                size === "sm"
                                    ? "text-xl"
                                    : size === "md"
                                        ? "text-2xl"
                                        : "text-3xl"
                            }`}
                            aria-label={`${starValue} stars`}
                        >
                            ★
                        </button>
                    );
                })}
            </div>

            {showNumber && (
                <span
                    className={`
            font-semibold 
            ${size === "sm" ? "text-base" : size === "md" ? "text-lg" : "text-xl"}
            ${rating ? "text-yellow-500" : "text-gray-400"}
          `}
                >
          {rating || "0"}
        </span>
            )}
        </div>
    );
};