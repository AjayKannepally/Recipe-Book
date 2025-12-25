import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import RecipeCard from './components/RecipeCard';
import RecipeForm from './components/RecipeForm';
import EmptyState from './components/EmptyState';
import DeleteConfirmation from './components/DeleteConfirmation';
import { Recipe } from './types/recipe';
import { getRecipes, addRecipe, updateRecipe, deleteRecipe } from './utils/localStorage';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    recipeId: string;
    recipeName: string;
  }>({
    isOpen: false,
    recipeId: '',
    recipeName: ''
  });
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    const loadedRecipes = getRecipes();
    setRecipes(loadedRecipes);
    setFilteredRecipes(loadedRecipes);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRecipes(recipes);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.ingredients.some((ing) => ing.toLowerCase().includes(query)) ||
        recipe.instructions.toLowerCase().includes(query)
      );
      setFilteredRecipes(filtered);
    }
  }, [searchQuery, recipes]);

  const handleAddRecipe = () => {
    setEditingRecipe(null);
    setIsFormOpen(true);
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setIsFormOpen(true);
  };

  const handleSubmitRecipe = (recipe: Recipe) => {
    if (editingRecipe) {
      updateRecipe(recipe);
    } else {
      addRecipe(recipe);
    }
    const updatedRecipes = getRecipes();
    setRecipes(updatedRecipes);
    setEditingRecipe(null);
  };

  const handleDeleteClick = (id: string) => {
    const recipe = recipes.find((r) => r.id === id);
    if (recipe) {
      setDeleteConfirmation({
        isOpen: true,
        recipeId: id,
        recipeName: recipe.name
      });
    }
  };

  const handleConfirmDelete = () => {
    deleteRecipe(deleteConfirmation.recipeId);
    const updatedRecipes = getRecipes();
    setRecipes(updatedRecipes);
    setDeleteConfirmation({ isOpen: false, recipeId: '', recipeName: '' });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, recipeId: '', recipeName: '' });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddRecipe={handleAddRecipe}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredRecipes.length === 0 ? (
          <EmptyState
            onAddRecipe={handleAddRecipe}
            isSearching={searchQuery.trim() !== ''}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onEdit={handleEditRecipe}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </main>

      <RecipeForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingRecipe(null);
        }}
        onSubmit={handleSubmitRecipe}
        editingRecipe={editingRecipe}
      />

      <DeleteConfirmation
        isOpen={deleteConfirmation.isOpen}
        recipeName={deleteConfirmation.recipeName}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default App;
