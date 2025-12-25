export interface Recipe {
  id: string;
  name: string;
  imageUrl: string;
  ingredients: string[];
  instructions: string;
  createdAt: number;
}

export interface RecipeFormData {
  name: string;
  imageUrl: string;
  ingredients: string;
  instructions: string;
}
