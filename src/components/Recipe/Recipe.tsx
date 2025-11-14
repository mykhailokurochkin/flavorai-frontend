import { Link } from "react-router-dom";

const Recipe = () => {
  return (
    <Link to='' className="flex flex-col grow bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden">
      <div className="h-40 bg-gray-200">
      </div>
      <div className="p-4 flex flex-col grow">
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
      </div>
    </Link>
  )
}

export default Recipe;