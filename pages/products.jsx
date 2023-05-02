import styles from "../styles/Products.module.css";
import axios from "axios";
import { useState } from "react";
import Add from "../components/product/productAdd/AddModal";
import ProductList from "../components/product/productWrapper/ProductWrapper";
import Navbar from "../components/main/navbar/Navbar";

export default function Products({ productList, admin }) {
  const [close, setClose] = useState(true)
  return (
    //Going to have to mess with styling to get the background image to work.
    <div className={styles.container}>
      <div className={styles.cover}>
        <Navbar />
        {/* {<Sidebar admin = {admin} setClose = {setClose}/>} */}
        <ProductList productList={productList} />
        {!close && <Add setClose={setClose} />}
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || ""
  const BackendURL = process.env.AXIOS_URL + "/api/products"
  let admin = false

  if (myCookie.token === process.env.TOKEN) {
    admin = true
  }
  const res = await axios.get(BackendURL);
  return {
    props: {
      productList: res.data,
      admin
    },
  };
};