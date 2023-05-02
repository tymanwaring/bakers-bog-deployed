import styles from "./RecepieList.module.css";
import RecipeCard from "../recipeCard/RecipeCard";

const RecipeList = ({ recipeList }) => {
  return (
    <div className={styles.container}>
      <div className={styles.titlePadding}>
      </div>
      <div className={styles.wrapper}>
        {recipeList?.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
