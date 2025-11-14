import Recipe from '../../components/Recipe/Recipe';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <main>
      <section className="bg-green-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900">Welcome to FlavorAI</h1>
          <p className="mt-4 text-xl text-gray-600">
            Discover thousands of recipes from around the world.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Recipe />
            <Recipe />
            <Recipe />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">1. Search</h3>
              <p className="text-gray-600">Find the perfect recipe by searching our vast collection.</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">2. Cook</h3>
              <p className="text-gray-600">Follow our easy step-by-step instructions.</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">3. Enjoy</h3>
              <p className="text-gray-600">Enjoy your delicious home-cooked meal.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Cooking?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Create an account to save your favorite recipes and share your own.
          </p>
          <Link
            to="/register"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;