import { Edit2, Trash2, Clock } from 'lucide-react';
import { Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
}

export default function RecipeCard({ recipe, onEdit, onDelete }: RecipeCardProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&auto=format&fit=crop';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl">🍽️</span>
          </div>
        )}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={() => onEdit(recipe)}
            className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Edit recipe"
          >
            <Edit2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </button>
          <button
            onClick={() => onDelete(recipe.id)}
            className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Delete recipe"
          >
            <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
          </button>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {recipe.name}
        </h3>

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <Clock className="w-4 h-4 mr-1" />
          <span>{formatDate(recipe.createdAt)}</span>
        </div>

        <div className="mb-3">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Ingredients:
          </h4>
          <div className="flex flex-wrap gap-1">
            {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
              <span
                key={index}
                className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full"
              >
                {ingredient}
              </span>
            ))}
            {recipe.ingredients.length > 3 && (
              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                +{recipe.ingredients.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Instructions:
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {recipe.instructions}
          </p>
        </div>
      </div>
    </div>
  );
}
