import axios from "axios";
import { useState } from "react";
import RecipeList from "../components/recipe/recipeList/RecipeList";
import Navbar from "../components/main/navbar/Navbar";

export default function Recipes({ recipeList, admin }) {
  const [close, setClose] = useState(true)
  return (
    <div className="h-screen overflow-hidden bg-[url('/img/bakery_inside.png')] bg-cover bg-fixed bg-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 backdrop-blur-[2px]" />
      <div className="relative h-full flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-auto">
          <RecipeList recipeList={recipeList} />
        </div>
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