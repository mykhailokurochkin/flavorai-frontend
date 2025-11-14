import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyRecipes } from '../../services/recipeService';
import Recipe from '../../components/Recipe/Recipe';
import type { Recipe as RecipeType } from '../../types/recipe';

const MyRecipesPage = () => {
  const { data: recipes, isLoading, isError, error } = useQuery<RecipeType[], Error>({
    queryKey: ['myRecipes'],
    queryFn: getMyRecipes,
  });

  if (isLoading) {
    return (
      <main className="max-w-7xl mx-auto p-4 text-center">
        <p>Loading your recipes...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="max-w-7xl mx-auto p-4 text-center text-red-600">
        <p>Error: {error?.message || 'Failed to fetch your recipes'}</p>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Recipes</h1>
      {recipes && recipes.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {recipes.map((recipe) => (
            <Recipe
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              imageUrl={recipe.imageUrl}
              cookingTime={recipe.cookingTime}
              difficulty={recipe.difficulty}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">You haven't created any recipes yet.</p>
      )}
    </main>
  );
};

export default MyRecipesPage;
