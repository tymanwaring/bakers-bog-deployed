import styles from "./RecepieList.module.css";
import RecipeCard from "../recipeCard/RecipeCard";

const RecipeList = ({ recipeList }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl text-white mb-4">Our Recipes</h1>
        <div className="w-20 h-1 bg-amber-500 mx-auto rounded-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipeList?.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
