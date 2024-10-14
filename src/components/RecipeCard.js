const RecipeCard = ({ recipe }) => (
    <div className="border p-4 rounded shadow-md">
      <h2 className="text-xl font-bold">{recipe.title}</h2>
      <p>{recipe.category}</p>
      <p>{recipe.ingredients}</p>
      <p>{recipe.instructions}</p>
    </div>
  );
  
  export default RecipeCard;
  