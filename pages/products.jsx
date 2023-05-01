import styles from "../styles/Products.module.css";
import axios from "axios";
import { useState } from "react";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import ProductList from "../components/ProductDisplay";
import Sidebar from "../components/Sidebar"
import TestNav from "../components/TestNav";

export default function Products({ productList, admin }) {
  const [close, setClose] = useState(true)
  return (
    //Going to have to mess with styling to get the background image to work.
    <div className={styles.container}>
      <div className={styles.cover}>
        <TestNav />
        {/* {<Sidebar admin = {admin} setClose = {setClose}/>} */}
        <ProductList productList={productList} />
        {!close && <Add setClose={setClose} />}
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
  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      productList: res.data,
      admin
    },
  };
};