"use client";
import React, { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  onSearch,
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    onSearch(trimmedQuery);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-end rounded-lg px-10 pt-5 py-2"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="outline-[#09B9FF] w-4/12 bg-white shadow-lg text-sm p-4 rounded-lg"
      />
    </form>
  );
};

export default SearchBar;
