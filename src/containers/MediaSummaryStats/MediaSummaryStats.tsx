
import React from "react";
import {calculateMovieAverages} from "../../lib/utils";

interface WatchedMovie {
  imdbRating: number;
  userRating?: number;
  runtime: number;
}

interface MediaSummaryStatsProps {
  watched: WatchedMovie[];
}

export const MediaSummaryStats: React.FC<MediaSummaryStatsProps> = ({ watched }) => {
  const { avgImdbRating, avgUserRating, avgRuntime } = calculateMovieAverages(
      watched || []
  );

  return (
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold mb-4">Movies you watched</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatItem
              icon="#️⃣"
              label="Total movies"
              value={watched.length.toString()}
          />
          <StatItem
              icon="⭐"
              label="IMDb Rating"
              value={avgImdbRating.toFixed(1)}
          />
          <StatItem
              icon="🌟"
              label="Your Rating"
              value={avgUserRating.toFixed(1)}
          />
          <StatItem
              icon="⏳"
              label="Average Runtime"
              value={`${avgRuntime} min`}
          />
        </div>
      </div>
  );
};

// Вспомогательный компонент для отображения статистики
interface StatItemProps {
  icon: string;
  label: string;
  value: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, label, value }) => (
    <div className="bg-gray-700 p-3 rounded-lg">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-lg font-semibold mt-1">
        <span className="mr-2">{icon}</span>
        {value}
      </p>
    </div>
);