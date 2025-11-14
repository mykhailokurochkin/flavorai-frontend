import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRecipeById, deleteRecipe } from '../../services/recipeService';
import type { Recipe } from '../../types/recipe';
import { useAuth } from '../../context/AuthContext';

const RecipeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated, user } = useAuth();

  const { data: recipe, isLoading, isError, error } = useQuery<Recipe, Error>({
    queryKey: ['recipe', id],
    queryFn: () => getRecipeById(id!),
    enabled: !!id,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      queryClient.invalidateQueries({ queryKey: ['myRecipes'] });
      navigate('/recipes');
    },
    onError: (err) => {
      console.error('Delete recipe error:', err.message);
      alert(`Failed to delete recipe: ${err.message}`);
    },
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteMutation.mutate(id!);
    }
  };

  const isOwner = isAuthenticated && user && recipe && recipe.ownerId === user.id;

  console.log('isAuthenticated:', isAuthenticated);
  console.log('user:', user);
  console.log('recipe:', recipe);
  console.log('recipe?.ownerId:', recipe?.ownerId);
  console.log('user?.id:', user?.id);
  console.log('isOwner:', isOwner);

  if (isLoading) {
    return (
      <main className="bg-gray-50 min-h-screen py-8 text-center">
        <p>Loading recipe details...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="bg-gray-50 min-h-screen py-8 text-center text-red-600">
        <p>Error: {error?.message || 'Failed to fetch recipe details'}</p>
      </main>
    );
  }

  if (!recipe) {
    return (
      <main className="bg-gray-50 min-h-screen py-8 text-center text-gray-600">
        <p>Recipe not found.</p>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Recipes
          </button>

          {isOwner && (
            <div className="space-x-3">
              <button
                onClick={() => navigate(`/recipes/edit/${id}`)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.38-2.828-2.828z" />
                </svg>
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          )}
        </div>

        <div className="relative h-96">
          {recipe.imageUrl ? (
            <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-2xl">No Image</div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-8">
            <h1 className="text-5xl font-extrabold text-white leading-tight">{recipe.title}</h1>
          </div>
        </div>

        <div className="p-8">
          <div className="flex flex-wrap items-center text-gray-700 text-lg mb-8 space-x-6">
            <span className="flex items-center">
              <svg className="h-6 w-6 mr-2 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {recipe.cookingTime}
            </span>
            <span className="flex items-center">
              <svg className="h-6 w-6 mr-2 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.964 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.964 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.964 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.964 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              {recipe.difficulty}
            </span>
          </div>

          <section className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{recipe.description}</p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Ingredients</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
                {recipe.ingredients.split('\n').filter(line => line.trim() !== '').map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Instructions</h2>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 text-lg">
                {recipe.instructions.split('\n').filter(line => line.trim() !== '').map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RecipeDetailsPage;
