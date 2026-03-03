import React, { useState } from 'react';
import { Search, X, Trash2 } from 'lucide-react';

const SearchBar = ({ onSearch, ingredients = [] }) => {
  const [inputValue, setInputValue] = useState('');

  const addIngredient = (ingredient) => {
    const trimmed = ingredient.trim().toLowerCase();
    if (trimmed && !ingredients.includes(trimmed)) {
      const newIngredients = [...ingredients, trimmed];
      onSearch(newIngredients);
    }
    setInputValue('');
  };

  const removeIngredient = (ingToRemove) => {
    const newIngredients = ingredients.filter(ing => ing !== ingToRemove);
    onSearch(newIngredients);
  };

  const clearAll = () => {
    onSearch([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addIngredient(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && ingredients.length > 0) {
      removeIngredient(ingredients[ingredients.length - 1]);
    }
  };

  return (
    <div className="flex flex-col items-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 text-center tracking-tight">
        Find your next <span className="text-orange-500">favorite meal.</span>
      </h1>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        What's in your kitchen? Enter multiple ingredients to see what you can cook.
      </p>

      <div className="w-full max-w-2xl">
        <div className="relative group bg-white border border-gray-200 rounded-3xl shadow-xl shadow-orange-500/5 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 transition-all p-2">
          <div className="flex flex-wrap gap-2 items-center">
            {ingredients.map((ing, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-xl text-sm font-semibold border border-orange-100 animate-in zoom-in duration-300"
              >
                {ing}
                <button
                  onClick={() => removeIngredient(ing)}
                  className="hover:text-orange-900 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => inputValue && addIngredient(inputValue)}
              placeholder={ingredients.length === 0 ? "Enter ingredients (e.g., chicken, pasta)" : "Add more..."}
              className="flex-1 min-w-[120px] px-4 py-3 text-lg bg-transparent focus:outline-none"
            />

            {ingredients.length > 0 && (
              <button
                onClick={clearAll}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-xl hover:bg-red-50"
                title="Clear all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={() => addIngredient(inputValue)}
              className="p-3 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20"
            >
              <Search className="w-6 h-6" />
            </button>
          </div>
        </div>

        <p className="mt-4 text-xs font-medium text-gray-400 uppercase tracking-widest text-center">
          Try: <button onClick={() => addIngredient('Yam')} className="text-orange-500 hover:underline">Yam</button>, <button onClick={() => addIngredient('Egg')} className="text-orange-500 hover:underline">Egg</button>, or <button onClick={() => addIngredient('Spinach')} className="text-orange-500 hover:underline">Spinach</button>
        </p>
      </div>
    </div>
  );
};

export default SearchBar;
