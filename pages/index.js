import { useState } from "react";
import Navbar from "../components/main/navbar/Navbar";
import styles from "../styles/Home.module.css";

export default function Home({}) {
  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        <Navbar />
      </div>
    </div>
  );
}
