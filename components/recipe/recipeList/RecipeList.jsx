import styles from "../styles/RecepieDisplay.module.css";
import RecipeCard from "../RecipeDisplayCard";

const RecipeDisplay = ({ recipeList }) => {
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

export default RecipeDisplay;
