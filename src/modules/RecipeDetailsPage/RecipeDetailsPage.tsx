import { useParams, useNavigate } from 'react-router-dom';

const RecipeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const recipe = {
    id: id,
    title: `Delicious Recipe ${id}`,
    description: 'This is a placeholder description for a delicious recipe. It is easy to make and perfect for any occasion. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    ingredients: [
      '200g Pasta',
      '100g Bacon or Pancetta',
      '2 Egg Yolks',
      '50g Pecorino Romano cheese',
      'Black Pepper',
      'Salt',
      'Olive Oil',
    ],
    instructions: [
      'Step 1: Cook the pasta in a large pot of salted boiling water until al dente.',
      'Step 2: While the pasta is cooking, cut the bacon or pancetta into small pieces and fry in a pan until crispy. Remove from heat and set aside.',
      'Step 3: In a bowl, whisk together the egg yolks, grated Pecorino Romano cheese, and a generous amount of black pepper.',
      'Step 4: Drain the pasta, reserving some of the pasta water. Add the hot pasta to the pan with the bacon. Quickly add the egg mixture and a splash of reserved pasta water. Stir vigorously to create a creamy sauce. The heat from the pasta will cook the eggs without scrambling them.',
      'Step 5: Serve immediately, garnished with extra Pecorino Romano cheese and black pepper.',
    ],
    cookingTime: '30 mins',
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1588166524941-cf537704572c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', // Placeholder image
  };

  if (!recipe) {
    return <div className="text-center p-8 text-gray-600">Recipe not found.</div>;
  }

  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Back Button */}
        <div className="p-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Recipes
          </button>
        </div>

        {/* Recipe Image */}
        <div className="relative h-96">
          <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-8">
            <h1 className="text-5xl font-extrabold text-white leading-tight">{recipe.title}</h1>
          </div>
        </div>

        <div className="p-8">
          {/* Metadata */}
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

          {/* Description */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{recipe.description}</p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ingredients */}
            <section>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Ingredients</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </section>

            {/* Instructions */}
            <section>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Instructions</h2>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 text-lg">
                {recipe.instructions.map((instruction, index) => (
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
