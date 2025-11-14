// src/types/recipe.ts

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  imageUrl?: string; // Optional image URL
  // Add any other fields your backend recipe object might have
}

// Data structure for creating a new recipe (without ID)
export type CreateRecipeData = Omit<Recipe, 'id'>;

// Data structure for updating a recipe (all fields optional except ID)
export type UpdateRecipeData = Partial<Recipe> & { id: string };
