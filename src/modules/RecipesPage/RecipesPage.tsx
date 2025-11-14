import { Link } from "react-router-dom";
import Recipe from "../../components/Recipe/Recipe";

const RecipesPage = () => {
  return (
    <main className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All recipes</h2>
        <Link
          to="/recipes/new"
          className="flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Recipe
        </Link>
      </div>
      <input type="text" placeholder="Search for recipes..." className="mb-4 p-2 border rounded-lg w-full" />

      <div className="flex flex-wrap gap-4">
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
      </div>
    </main>
  )
}

export default RecipesPage;