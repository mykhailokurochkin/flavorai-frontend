import { Link } from "react-router-dom";
import type { Recipe as RecipeType } from '../../types/recipe';

interface RecipeProps {
  id: string;
  title: string;
  imageUrl?: string;
  cookingTime: string;
  difficulty: string;
}

const Recipe: React.FC<RecipeProps> = ({ id, title, imageUrl, cookingTime, difficulty }) => {
  return (
    <Link to={`/recipes/${id}`} className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden">
      <div className="h-40 bg-gray-200">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>Time: {cookingTime}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>Difficulty: {difficulty}</span>
        </div>
      </div>
    </Link>
  )
}

export default Recipe;