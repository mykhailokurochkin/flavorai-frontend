export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  cookingTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  imageUrl?: string;
  ownerId: string;
}

export type CreateRecipeData = Omit<Recipe, 'id' | 'ownerId'>;

export type UpdateRecipeData = Partial<Recipe> & { id: string };
