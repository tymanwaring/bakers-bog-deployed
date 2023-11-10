import styles from "../styles/Recipes.module.css";
import axios from "axios";
import { useState } from "react";
import RecipeList from "../components/recipe/recipeList/RecipeList";
import Navbar from "../components/main/navbar/Navbar";


export default function Recipes({ recipeList, admin }) {
  const [close, setClose] = useState(true)
  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        <Navbar />
        <RecipeList recipeList={recipeList} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const BackendURL = process.env.AXIOS_URL + `/api/recipes`
  const myCookie = ctx.req?.cookies || ""
  let admin = false

  if (myCookie.token === process.env.TOKEN) {
    admin = true
  }
  const res = await axios.get(BackendURL);
  return {
    props: {
      recipeList: res.data,
      admin
    },
  };
};