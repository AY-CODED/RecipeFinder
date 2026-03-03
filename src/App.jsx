import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import RecipeGrid from './components/RecipeGrid';
import RecipeModal from './components/RecipeModal';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setSearchTerm(query);
    setSelectedMealId(null);

    try {
      const [ingRes, nameRes] = await Promise.all([
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`).then(r => r.json()),
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`).then(r => r.json())
      ]);

      const ingMeals = ingRes.meals || [];
      const nameMeals = nameRes.meals || [];

      const combinedMap = new Map();

      // Ingredient matches get the 'ingredient' source
      ingMeals.forEach(meal => {
        combinedMap.set(meal.idMeal, { ...meal, source: 'ingredient' });
      });

      // Name matches get the 'name' source (if not already found via ingredient)
      nameMeals.forEach(meal => {
        if (!combinedMap.has(meal.idMeal)) {
          combinedMap.set(meal.idMeal, { ...meal, source: 'name' });
        }
      });

      const mergedResults = Array.from(combinedMap.values());
      setRecipes(mergedResults.length > 0 ? mergedResults : null);
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
        <SearchBar onSearch={handleSearch} />

        {searchTerm && !loading && recipes && recipes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-gray-500 font-medium">
              Showing results for <span className="text-gray-900 font-bold">"{searchTerm}"</span>
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
