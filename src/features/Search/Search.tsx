import React from "react";

interface SearchProps {
  query: string;
  setQuery: (query: string) => void;
}

export const Search: React.FC<SearchProps> = ({ query, setQuery }) => {
  return (
      <input
          className="w-64 px-4 py-2 bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
      />
  );
};