import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { Recipe, RecipeFormData } from '../types/recipe';

interface RecipeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (recipe: Recipe) => void;
  editingRecipe?: Recipe | null;
}

export default function RecipeForm({ isOpen, onClose, onSubmit, editingRecipe }: RecipeFormProps) {
  const [formData, setFormData] = useState<RecipeFormData>({
    name: '',
    imageUrl: '',
    ingredients: '',
    instructions: ''
  });
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (editingRecipe) {
      setFormData({
        name: editingRecipe.name,
        imageUrl: editingRecipe.imageUrl,
        ingredients: '',
        instructions: editingRecipe.instructions
      });
      setIngredientsList(editingRecipe.ingredients);
      setImagePreview(editingRecipe.imageUrl);
    } else {
      resetForm();
    }
  }, [editingRecipe, isOpen]);

  useEffect(() => {
    if (formData.imageUrl) {
      setImagePreview(formData.imageUrl);
    }
  }, [formData.imageUrl]);

  const resetForm = () => {
    setFormData({
      name: '',
      imageUrl: '',
      ingredients: '',
      instructions: ''
    });
    setIngredientsList([]);
    setCurrentIngredient('');
    setImagePreview('');
  };

  const handleAddIngredient = () => {
    if (currentIngredient.trim()) {
      setIngredientsList([...ingredientsList, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredientsList(ingredientsList.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || ingredientsList.length === 0 || !formData.instructions.trim()) {
      alert('Please fill in all required fields and add at least one ingredient.');
      return;
    }

    const recipe: Recipe = {
      id: editingRecipe?.id || crypto.randomUUID(),
      name: formData.name.trim(),
      imageUrl: formData.imageUrl.trim(),
      ingredients: ingredientsList,
      instructions: formData.instructions.trim(),
      createdAt: editingRecipe?.createdAt || Date.now()
    };

    onSubmit(recipe);
    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-colors duration-300">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {editingRecipe ? 'Edit Recipe' : 'Add New Recipe'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Recipe Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
              placeholder="Enter recipe name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
              placeholder="https://example.com/image.jpg"
            />
            {imagePreview && (
              <div className="mt-3 relative rounded-lg overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                  onError={() => setImagePreview('')}
                />
                <div className="absolute top-2 right-2">
                  <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                    <ImageIcon className="w-3 h-3" />
                    <span>Preview</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Ingredients *
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentIngredient}
                onChange={(e) => setCurrentIngredient(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddIngredient())}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                placeholder="Add an ingredient"
              />
              <button
                type="button"
                onClick={handleAddIngredient}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
            {ingredientsList.length > 0 && (
              <div className="mt-3 space-y-2">
                {ingredientsList.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg"
                  >
                    <span className="text-gray-700 dark:text-gray-300">{ingredient}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(index)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors duration-200"
                      aria-label="Remove ingredient"
                    >
                      <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Cooking Instructions *
            </label>
            <textarea
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
              placeholder="Enter step-by-step cooking instructions"
              rows={6}
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-medium shadow-md"
            >
              {editingRecipe ? 'Update Recipe' : 'Add Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
