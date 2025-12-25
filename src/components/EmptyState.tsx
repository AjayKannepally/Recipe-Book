import { ChefHat } from 'lucide-react';

interface EmptyStateProps {
  onAddRecipe: () => void;
  isSearching: boolean;
}

export default function EmptyState({ onAddRecipe, isSearching }: EmptyStateProps) {
  if (isSearching) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          No recipes found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
          Try adjusting your search terms or clear the search to see all recipes.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-full mb-6">
        <ChefHat className="w-16 h-16 text-white" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
        No recipes yet
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-8">
        Start building your collection by adding your first recipe. Share your favorite dishes and keep them organized in one place!
      </p>
      <button
        onClick={onAddRecipe}
        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
      >
        Add Your First Recipe
      </button>
    </div>
  );
}
