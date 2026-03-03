import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="flex flex-col items-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 text-center tracking-tight">
        Find your next <span className="text-orange-500">favorite meal.</span>
      </h1>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        Discover hundreds of delicious recipes by searching for your favorite ingredients.
      </p>
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-2xl group"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter one main ingredient..."
          className="w-full px-8 py-5 text-lg bg-white border border-gray-200 rounded-3xl shadow-xl shadow-orange-500/5 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all pr-16"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20"
        >
          <Search className="w-6 h-6" />
        </button>
      </form>
      <p className="mt-4 text-xs font-medium text-gray-400 uppercase tracking-widest">
        Try: <button onClick={() => {setQuery('Chicken'); onSearch('Chicken')}} className="text-orange-500 hover:underline">Chicken</button>, <button onClick={() => {setQuery('Salmon'); onSearch('Salmon')}} className="text-orange-500 hover:underline">Salmon</button>, or <button onClick={() => {setQuery('Pasta'); onSearch('Pasta')}} className="text-orange-500 hover:underline">Pasta</button>
      </p>
    </div>
  );
};

export default SearchBar;
