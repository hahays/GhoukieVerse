import React from "react";
import {Movie} from "../../types";


interface NumResultsProps {
    movies: Movie[];
}

export const NumResults: React.FC<NumResultsProps> = ({ movies }) => {
    return (
        <p className="text-sm text-gray-300">
            Found <span className="font-bold">{movies.length}</span> results
        </p>
    );
};

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//     content: [
//         "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//         "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//         "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//     ],
//     theme: {
//         extend: {
//             colors: {
//                 'ghoukie-purple': '#7E22CE',
//                 'ghoukie-pink': '#EC4899',
//             },
//         },
//     },
//     plugins: [],
// };

