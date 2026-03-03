import React from 'react';
import { SearchX, ShoppingBasket } from 'lucide-react';
import RecipeCard from './RecipeCard';

const RecipeGrid = ({ recipes, loading, onRecipeClick }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            <div className="aspect-[4/5] bg-gray-100" />
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-100 rounded-full w-3/4" />
              <div className="flex justify-between">
                <div className="h-3 bg-gray-100 rounded-full w-1/4" />
                <div className="h-6 w-6 bg-gray-100 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (recipes === null) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in zoom-in duration-500">
        <div className="bg-orange-50 w-24 h-24 rounded-full flex items-center justify-center mb-6">
          <SearchX className="w-12 h-12 text-orange-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">No matching recipes</h3>
        <p className="text-gray-500 mt-2 max-w-sm">
          We couldn't find any recipes with those ingredients. Try removing some or adding more common ones like "Chicken" or "Rice".
        </p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
       <div className="flex flex-col items-center justify-center py-32 text-center opacity-70">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
            <ShoppingBasket className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium max-w-xs leading-relaxed">
            Enter the ingredients you have to see what you can cook right now!
          </p>
       </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          onClick={onRecipeClick}
        />
      ))}
    </div>
  );
};

export default RecipeGrid;
