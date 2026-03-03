import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import RecipeGrid from './components/RecipeGrid';
import RecipeModal from './components/RecipeModal';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  const handleSearch = async (ingredientsArray) => {
    if (ingredientsArray.length === 0) {
      setRecipes([]);
      setIngredients([]);
      return;
    }

    setLoading(true);
    setIngredients(ingredientsArray);
    setSelectedMealId(null);

    try {
      const requests = ingredientsArray.map(ing =>
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing.toLowerCase().trim()}`).then(r => r.json())
      );

      const results = await Promise.all(requests);
      const mealsLists = results.map(data => data.meals || []);

      const mealMap = new Map();

      mealsLists.forEach((list) => {
        list.forEach(meal => {
          if (mealMap.has(meal.idMeal)) {
            const entry = mealMap.get(meal.idMeal);
            entry.matchCount += 1;
          } else {
            mealMap.set(meal.idMeal, {
              ...meal,
              matchCount: 1,
              totalIngredients: ingredientsArray.length
            });
          }
        });
      });

      const combinedResults = Array.from(mealMap.values());

      // Intersection: recipes matching ALL ingredients
      const intersection = combinedResults.filter(m => m.matchCount === ingredientsArray.length);

      let finalResults;
      if (intersection.length > 0) {
        finalResults = intersection;
      } else {
        // Fallback: Union sorted by match count
        finalResults = combinedResults.sort((a, b) => b.matchCount - a.matchCount);
      }

      setRecipes(finalResults.length > 0 ? finalResults : null);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes(null);
    } finally {
      setLoading(false);
    }
  };

  const openRecipeDetails = (id) => {
    setSelectedMealId(id);
  };

  const closeRecipeDetails = () => {
    setSelectedMealId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchBar onSearch={handleSearch} ingredients={ingredients} />

        {ingredients.length > 0 && !loading && recipes && recipes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-gray-500 font-medium">
              Showing recipes using <span className="text-gray-900 font-bold">{ingredients.join(', ')}</span>
              {recipes[0].matchCount < ingredients.length && (
                <span className="ml-2 text-orange-600">(Partial matches)</span>
              )}
            </h2>
          </div>
        )}

        <RecipeGrid
          recipes={recipes}
          loading={loading}
          onRecipeClick={openRecipeDetails}
        />
      </main>

      {selectedMealId && (
        <RecipeModal
          mealId={selectedMealId}
          onClose={closeRecipeDetails}
        />
      )}
    </div>
  );
}

export default App;
