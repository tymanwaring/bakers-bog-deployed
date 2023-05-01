import styles from "../styles/Locations.module.css";
import axios from "axios";
import { useState } from "react";
import LocationList from "../components/LocationDisplay";
import TestNav from "../components/TestNav";
import Footer from "../components/Footer"

export default function Locations({ locationList, admin }) {
  const [close, setClose] = useState(true)
  return (
    <div className={styles.container}>
      
      <div className={styles.cover}>
      <TestNav />
        <LocationList locationList={locationList} />
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
  const res = await axios.get("http://localhost:3000/api/locations");
  return {
    props: {
      locationList: res.data,
      admin
    },
  };
};