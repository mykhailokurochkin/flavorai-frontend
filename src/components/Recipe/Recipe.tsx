import { Link } from "react-router-dom";

const Recipe = () => {
  return (
    <Link to='' className="p-4 flex flex-col grow border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-white">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">Delicious Pasta</h3>
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <span>Time: 30 mins</span>
      </div>
      <div className="flex items-center text-sm text-gray-500 mb-3">
        <span>Difficulty: Easy</span>
      </div>
      <button
        className="mt-auto w-full bg-green-100 text-green-800 font-medium px-4 py-2 rounded-lg hover:bg-green-200 transition duration-150"
      >
        Переглянути рецепт
      </button>
    </Link>
  )
}

export default Recipe;