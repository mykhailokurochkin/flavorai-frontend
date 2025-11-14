import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { createRecipe, getRecipeById, updateRecipe } from '../../services/recipeService';
import type { CreateRecipeData, UpdateRecipeData, Recipe } from '../../types/recipe';

const NewRecipeFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [difficulty, setDifficulty] = useState<CreateRecipeData['difficulty']>('Easy');
  const [imageUrl, setImageUrl] = useState('');

  const { data: existingRecipe, isLoading: isLoadingRecipe } = useQuery<Recipe, Error>({
    queryKey: ['recipe', id],
    queryFn: () => getRecipeById(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (existingRecipe) {
      setTitle(existingRecipe.title);
      setDescription(existingRecipe.description);
      setIngredients(existingRecipe.ingredients);
      setInstructions(existingRecipe.instructions);
      setCookingTime(existingRecipe.cookingTime);
      setDifficulty(existingRecipe.difficulty);
      setImageUrl(existingRecipe.imageUrl || '');
    }
  }, [existingRecipe]);

  const createMutation = useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      queryClient.invalidateQueries({ queryKey: ['myRecipes'] });
      navigate('/my-recipes');
    },
    onError: (err) => {
      console.error('Create recipe error:', err.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateRecipeData) => updateRecipe(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      queryClient.invalidateQueries({ queryKey: ['myRecipes'] });
      queryClient.invalidateQueries({ queryKey: ['recipe', id] });
      navigate(`/recipes/${id}`);
    },
    onError: (err) => {
      console.error('Update recipe error:', err.message);
    },
  });

  const isEditMode = !!id;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const recipeData = {
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
      difficulty,
      imageUrl: imageUrl || undefined,
    };

    if (isEditMode) {
      const updatePayload: UpdateRecipeData = { id: id!, ...recipeData };
      updateMutation.mutate(updatePayload);
    } else {
      const createPayload: CreateRecipeData = recipeData;
      createMutation.mutate(createPayload);
    }
  };

  const isPending = isEditMode ? updateMutation.isPending : createMutation.isPending;
  const isError = isEditMode ? updateMutation.isError : createMutation.isError;
  const error = isEditMode ? updateMutation.error : createMutation.error;

  if (isEditMode && isLoadingRecipe) {
    return (
      <main className="bg-gray-50 min-h-full py-12 px-4 sm:px-6 lg:px-8 text-center">
        <p>Loading recipe for editing...</p>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900">
            {isEditMode ? 'Edit Your Recipe' : 'Share Your Culinary Creation'}
          </h2>
          <p className="mt-2 text-md text-gray-600">
            {isEditMode ? 'Update the details of your recipe.' : 'Fill out the form below to add your recipe to our collection.'}
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="recipe-title" className="block text-sm font-medium text-gray-700">
                Recipe Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="recipe-title"
                  id="recipe-title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full px-4 py-2.5 border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="e.g., Delicious Pasta Carbonara"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="A short and enticing description of your recipe..."
                />
              </div>
            </div>

            <div>
              <label htmlFor="image-url" className="block text-sm font-medium text-gray-700">
                Recipe Image URL
              </label>
              <div className="mt-1">
                <input
                  type="url"
                  name="image-url"
                  id="image-url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="block w-full px-4 py-2.5 border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="e.g., https://example.com/pasta.jpg"
                />
              </div>
            </div>

            <div>
              <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
                Ingredients (one per line)
              </label>
              <div className="mt-1">
                <textarea
                  id="ingredients"
                  name="ingredients"
                  rows={5}
                  required
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="List each ingredient on a new line."
                />
              </div>
            </div>

            <div>
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
                Instructions (one step per line)
              </label>
              <div className="mt-1">
                <textarea
                  id="instructions"
                  name="instructions"
                  rows={8}
                  required
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Provide step-by-step instructions."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="cooking-time" className="block text-sm font-medium text-gray-700">
                  Cooking Time (minutes)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="cooking-time"
                    id="cooking-time"
                    required
                    value={cookingTime}
                    onChange={(e) => setCookingTime(e.target.value)}
                    className="block w-full px-4 py-2.5 border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="e.g., 30"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  required
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as CreateRecipeData['difficulty'])}
                  className="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-lg"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>
          </div>

          {isError && (
            <div className="text-red-600 text-sm text-center mt-4">
              Error: {error?.message || 'An unexpected error occurred'}
            </div>
          )}

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (isEditMode ? 'Updating Recipe...' : 'Adding Recipe...') : (isEditMode ? 'Update Recipe' : 'Add Recipe')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default NewRecipeFormPage;
