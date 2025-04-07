import React from "react";

export const Logo: React.FC = () => {
    return (
        <div className="flex items-center gap-2 text-2xl font-bold">
            <span role="img" aria-label="Popcorn emoji">🍿</span>
            <h1>GhoukieVerse</h1>
        </div>
    );
};