import styles from "../styles/Recipes.module.css";
import axios from "axios";
import { useState } from "react";
import RecipeList from "../components/RecipeDisplay";
import TestNav from "../components/TestNav";
import Sidebar from "../components/Sidebar"

export default function Recipes({ recipeList, admin }) {
  const [close, setClose] = useState(true)
  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        <TestNav />
        {/* {Scrolling background Make sure it scrolls with the items} */}
        {/* {<Sidebar admin = {admin} setClose = {setClose}/>} */}
        <RecipeList recipeList={recipeList} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || ""
  let admin = false

  if (myCookie.token === process.env.TOKEN) {
    admin = true
  }
  const res = await axios.get("http://localhost:3000/api/recipes");
  return {
    props: {
      recipeList: res.data,
      admin
    },
  };
};