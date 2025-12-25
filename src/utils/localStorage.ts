import { Recipe } from '../types/recipe';

const STORAGE_KEY = 'recipes';

export const getRecipes = (): Recipe[] => {
  try {
    const recipes = localStorage.getItem(STORAGE_KEY);
    return recipes ? JSON.parse(recipes) : [];
  } catch (error) {
    console.error('Error reading recipes from localStorage:', error);
    return [];
  }
};

export const saveRecipes = (recipes: Recipe[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  } catch (error) {
    console.error('Error saving recipes to localStorage:', error);
  }
};

export const addRecipe = (recipe: Recipe): void => {
  const recipes = getRecipes();
  recipes.unshift(recipe);
  saveRecipes(recipes);
};

export const updateRecipe = (updatedRecipe: Recipe): void => {
  const recipes = getRecipes();
  const index = recipes.findIndex((r) => r.id === updatedRecipe.id);
  if (index !== -1) {
    recipes[index] = updatedRecipe;
    saveRecipes(recipes);
  }
};

export const deleteRecipe = (id: string): void => {
  const recipes = getRecipes();
  const filteredRecipes = recipes.filter((r) => r.id !== id);
  saveRecipes(filteredRecipes);
};
