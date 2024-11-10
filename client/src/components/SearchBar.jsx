import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Call onSearch on every keystroke
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex items-center justify-center m-5 min-w-64">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md min-w-28 focus:outline-none focus:ring-2 focus:ring-green-600"
        placeholder="Search..."
      />
      <button
        onClick={handleSearch}
        className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md focus:outline-none hover:bg-green-700"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;