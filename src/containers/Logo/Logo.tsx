import React from "react";

interface LogoProps {
    className?: string;
    icon?: string;
    appName?: string;
}

export const Logo: React.FC<LogoProps> = ({
                                              className = "",
                                              icon = "🍿",
                                              appName = "GhoukieVerse"
                                          }) => {
    return (
        <div className={`flex items-center gap-2 text-2xl font-bold ${className}`}>
      <span
          role="img"
          aria-label="Popcorn emoji"
          className="text-3xl"
      >
        {icon}
      </span>
            <h1 className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                {appName}
            </h1>
        </div>
    );
};