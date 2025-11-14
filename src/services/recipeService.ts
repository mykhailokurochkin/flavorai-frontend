import type { Recipe, CreateRecipeData, UpdateRecipeData } from '../types/recipe';
import type { ApiError } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error((data as ApiError).message || `API Error: ${response.statusText}`);
  }
  return data;
};

export const getAllRecipes = async (searchTerm?: string): Promise<Recipe[]> => {
  const url = searchTerm ? `${API_BASE_URL}/api/recipes?search=${encodeURIComponent(searchTerm)}` : `${API_BASE_URL}/api/recipes`;
  const response = await fetch(url, {
    credentials: 'include',
  });
  return handleResponse(response);
};

export const getRecipeById = async (id: string): Promise<Recipe> => {
  const response = await fetch(`${API_BASE_URL}/api/recipes/${id}`, {
    credentials: 'include',
  });
  return handleResponse(response);
};

export const getMyRecipes = async (): Promise<Recipe[]> => {
  const response = await fetch(`${API_BASE_URL}/api/recipes/my-recipes`, {
    credentials: 'include',
  });
  return handleResponse(response);
};

export const createRecipe = async (recipeData: CreateRecipeData): Promise<Recipe> => {
  const response = await fetch(`${API_BASE_URL}/api/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipeData),
    credentials: 'include',
  });
  return handleResponse(response);
};

export const updateRecipe = async (id: string, recipeData: UpdateRecipeData): Promise<Recipe> => {
  const response = await fetch(`${API_BASE_URL}/api/recipes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipeData),
    credentials: 'include',
  });
  return handleResponse(response);
};

export const deleteRecipe = async (id: string): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/recipes/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return handleResponse(response);
};
