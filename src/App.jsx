import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import RecipeGrid from './components/RecipeGrid';
import RecipeModal from './components/RecipeModal';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState(null);

  const handleSearch = async (ingredient) => {
    setLoading(true);
    setSelectedMealId(null);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await response.json();
      setRecipes(data.meals); // data.meals is null if nothing found
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
