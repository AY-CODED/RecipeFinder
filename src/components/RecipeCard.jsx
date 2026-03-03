import React from 'react';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

const RecipeCard = ({ recipe, onClick }) => {
  const isPerfectMatch = recipe.matchCount === recipe.totalIngredients;

  return (
    <div
      onClick={() => onClick(recipe.idMeal)}
      className={`group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 flex flex-col h-full ${
        isPerfectMatch ? 'border-green-500/50 shadow-green-500/5 bg-green-50/5' : 'border-gray-100'
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Match Badge */}
        <div className={`absolute top-4 right-4 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-sm border flex items-center gap-1.5 ${
          isPerfectMatch
            ? 'bg-green-500 text-white border-green-400'
            : 'bg-white/90 text-gray-700 border-white/50'
        }`}>
          {isPerfectMatch && <CheckCircle2 className="w-3.5 h-3.5" />}
          <span className="text-xs font-bold tracking-tight">
            Matches {recipe.matchCount}/{recipe.totalIngredients}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors flex-grow">
          {recipe.strMeal}
        </h3>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-orange-500">
            View Recipe
          </span>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isPerfectMatch
              ? 'bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white'
              : 'bg-gray-50 group-hover:bg-orange-500 group-hover:text-white'
          }`}>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
