import React from "react";

interface InputProps {
  query: string;
  setQuery: (value: string) => void;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
                                              query,
                                              setQuery,
                                              placeholder = "Search movies..."
                                            }) => {
  return (
      <input
          className="w-full p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
      />
  );
};