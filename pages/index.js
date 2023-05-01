import axios from "axios";
import { useState } from "react";
import Featured from "../components/Featured";
import TestNav from "../components/TestNav";
import LandingTitle from "../components/LandingTitle";
import styles from "../styles/Home.module.css";

export default function Home({ productList, admin }) {
  const [close, setClose] = useState(true)
  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        <TestNav />
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
