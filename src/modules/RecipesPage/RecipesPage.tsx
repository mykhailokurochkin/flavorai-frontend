import Recipe from "../../components/Recipe/Recipe";

const RecipesPage = () => {
  return (
    <main className="p-4">
      <h2 className="text-2xl font-bold mb-4">All recipes</h2>
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