import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";
import AddRecipeBtn from "../../components/recipe/recipeAddBtn/AddRecipeBtn";
import AddRecipe from "../../components/recipe/recipeAddBtn/AddRecipeModal";
import EditRecipe from "../../components/recipe/recipeEdit/EditRecipeModal";
import Navbar from "../../components/main/navbar/Navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const Index = ({ recipes, locations }) => {
  const [recipeList, setRecipeList] = useState(recipes);
  const [locationList, setLocationList] = useState(locations);
  const [closeRec, setCloseRec] = useState(true);
  const [editRecipe, setEditRecipe] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const handleRecipeDelete = async (id) => {
    try {
      setDeleteError(null);
      const response = await axios.delete(`/api/recipes/${id}`);
      if (response.status === 200) { 
        setRecipeList(recipeList.filter((recipe) => recipe._id !== id));
      }
    } catch (err) {
      console.error("Error deleting recipe:", err);
      setDeleteError(err.response?.data?.message || "Error deleting recipe");
    }
  };

  const handleRecipeEdit = async (recipe) => {
    setEditRecipe(recipe);
  };

  return (
    <div className="min-h-screen bg-amber-50/30">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-serif mb-8 text-amber-900">Recipe Management</h1>
        {deleteError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md font-serif">
            {deleteError}
          </div>
        )}
        <div className="mb-8">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-amber-200">
                <TableHead className="w-[80px] font-serif text-amber-900">Image</TableHead>
                <TableHead className="w-[80px] font-serif text-amber-900">ID</TableHead>
                <TableHead className="font-serif text-amber-900">Title</TableHead>
                <TableHead className="w-[240px] text-right font-serif text-amber-900">
                  <div className="flex justify-end gap-2 items-center">
                    Actions
                    <AddRecipeBtn setClose={setCloseRec} />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recipeList.map((recipe) => (
                <TableRow key={recipe._id} className="border-b border-amber-100 hover:bg-amber-50/50">
                  <TableCell>
                    <div className="h-10 w-10">
                      <Image
                        src={recipe.img}
                        width={40}
                        height={40}
                        alt={recipe.title}
                        className="object-cover rounded"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-amber-700">
                    {recipe._id.slice(0, 5)}...
                  </TableCell>
                  <TableCell className="font-serif text-amber-900">{recipe.title}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        className="px-4 py-1.5 text-sm bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 rounded-md font-serif transition-colors"
                        onClick={() => handleRecipeEdit(recipe)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-1.5 text-sm bg-white text-red-600 border border-red-200 hover:bg-red-50 rounded-md font-serif transition-colors"
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this recipe?')) {
                            handleRecipeDelete(recipe._id);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {!closeRec && <AddRecipe setClose={setCloseRec} setRecipeList={setRecipeList} />}
      {editRecipe && (
        <EditRecipe
          recipe={editRecipe}
          setEditRecipe={setEditRecipe}
          setRecipeList={setRecipeList}
        />
      )}
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const URL = "https://www.thebakersbog.com/";
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const recipeRes = await axios.get(URL + `/api/recipes`);
  const locationRes = await axios.get(URL + `/api/locations`);

  return {
    props: {
      recipes: recipeRes.data,
      locations: locationRes.data,
    },
  };
};

export default Index;
