// src/services/recipeService.ts
import type { Recipe, CreateRecipeData, UpdateRecipeData } from '../types/recipe';
import type { ApiError } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error((data as ApiError).message || `API Error: ${response.statusText}`);
  }
  return data;
};

/**
 * Fetches all recipes from the backend.
 * @returns A Promise that resolves with an array of Recipe objects.
 */
export const getAllRecipes = async (): Promise<Recipe[]> => {
  const response = await fetch(`${API_BASE_URL}/api/recipes`);
  return handleResponse(response);
};

/**
 * Fetches a single recipe by its ID from the backend.
 * @param id - The ID of the recipe to fetch.
 * @returns A Promise that resolves with a single Recipe object.
 */
export const getRecipeById = async (id: string): Promise<Recipe> => {
  const response = await fetch(`${API_BASE_URL}/api/recipes/${id}`);
  return handleResponse(response);
};

/**
 * Creates a new recipe on the backend.
 * @param recipeData - The data for the new recipe.
 * @returns A Promise that resolves with the created Recipe object.
 */
export const createRecipe = async (recipeData: CreateRecipeData): Promise<Recipe> => {
  const response = await fetch(`${API_BASE_URL}/api/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // If using Bearer token
    },
    body: JSON.stringify(recipeData),
  });
  return handleResponse(response);
};

/**
 * Updates an existing recipe on the backend.
 * @param id - The ID of the recipe to update.
 * @param recipeData - The updated data for the recipe.
 * @returns A Promise that resolves with the updated Recipe object.
 */
export const updateRecipe = async (id: string, recipeData: UpdateRecipeData): Promise<Recipe> => {
  const response = await fetch(`${API_BASE_URL}/api/recipes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // If using Bearer token
    },
    body: JSON.stringify(recipeData),
  });
  return handleResponse(response);
};

/**
 * Deletes a recipe from the backend.
 * @param id - The ID of the recipe to delete.
 * @returns A Promise that resolves with a success message or status.
 */
export const deleteRecipe = async (id: string): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/recipes/${id}`, {
    method: 'DELETE',
    headers: {
      // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // If using Bearer token
    },
  });
  return handleResponse(response);
};
