import React from 'react';
import { Leaf, Utensils, ChevronRight } from 'lucide-react';

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div
      onClick={() => onClick(recipe.idMeal)}
      className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col h-full"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Source Icon Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-2xl shadow-sm">
          {recipe.source === 'ingredient' ? (
            <Leaf className="w-4 h-4 text-green-500" />
          ) : (
            <Utensils className="w-4 h-4 text-orange-500" />
          )}
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
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
