import React, { useEffect, useState } from 'react';
import { X, Play, Loader2 } from 'lucide-react';

const RecipeModal = ({ mealId, onClose }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        setRecipe(data.meals[0]);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (mealId) {
      fetchRecipeDetails();
    }
  }, [mealId]);

  if (!mealId) return null;

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
          </div>
        ) : recipe ? (
          <>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-800 hover:bg-white transition-colors shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image Section */}
                <div className="relative h-64 md:h-full min-h-[300px]">
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Info Section */}
                <div className="p-6 md:p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{recipe.strMeal}</h2>
                  <div className="flex gap-2 mb-6">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                      {recipe.strCategory}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                      {recipe.strArea}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">Ingredients</h3>
                  <ul className="grid grid-cols-1 gap-2 mb-8">
                    {getIngredients().map((item, idx) => (
                      <li key={idx} className="flex justify-between text-sm py-1 border-b border-gray-50">
                        <span className="text-gray-700">{item.ingredient}</span>
                        <span className="font-medium text-gray-500">{item.measure}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">Instructions</h3>
                  <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line mb-8">
                    {recipe.strInstructions}
                  </div>

                  {recipe.strYoutube && (
                    <a
                      href={recipe.strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold"
                    >
                      <Play className="w-5 h-5 fill-current" />
                      Watch on YouTube
                    </a>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <p>Something went wrong. Please try again.</p>
            <button onClick={onClose} className="mt-4 text-orange-500 font-bold">Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeModal;
