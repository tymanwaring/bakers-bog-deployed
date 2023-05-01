import styles from "../../styles/Recipe.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from 'axios';
import TestNav from "../../components/TestNav";

const Recipe = ({ recipe }) => {
  return (
    <div className={styles.container}>
      <TestNav />
      <div className={styles.cover}>
        <div className={styles.contents}>
          <div className={`row ${styles.padder}`}>
            <div className = {`col-3`}></div>
            <div className = {`col-6 ${styles.top_container}`}>
              <h1 className={styles.title}>{recipe.title}</h1>
              <h2 className = {styles.description}>{recipe.desc}</h2>
              <div className = "row">
                <div className = "col-6">
                  <p className={styles.cook}><Image src="/img/stopwatch.png" alt="" width="75px" height="75px" /> </p>  
                </div>
                <div className = "col-6">
                  <p className={styles.cook}><Image src="/img/clipboard.png" alt="" width="75px" height="75px" /> </p>  
                </div>
              </div>
              <div className = "row">
                <div className = "col-6">
                  <h1 className={styles.prep}>prep: {recipe.prep_time}</h1>
                  <h2 className={styles.prep}>cook: {recipe.cook_time}</h2>      
                </div>
                <div className = "col-6">
                  <h1 className = {styles.level}>Easy</h1>
                </div>
              </div>
            </div>

            <div className = "col-3"></div>
          </div>
          <div className = "space_after_title"><br></br></div>
          <div className = "row">
          <div className = "col-3"></div>
          <div className = {`col-3 ${styles.top_container}`}>
            <h3 className={styles.ingredients_header}>Ingredients</h3>
            <h3 className = {styles.header_boarder}><br></br></h3>
            <div className = {styles.ingredients}>
              <ul>
                {recipe.ingrediants?.map((ingrediant) => (
                  <li className={styles.ingredient} key = {ingrediant._id}>{ingrediant}</li>
                ))}
              </ul>

            </div>
          </div>
          <div className = {`col-3 ${styles.top_container}`}>
              <div className={styles.img}>
                  <Image src={recipe.img} height="350px" width="350px" alt="" />
              </div>
            </div>
          <div className = "col-3"></div>
          </div>
          <div className = "space_after_title"><br></br></div> 
          <div className = "row">
          <div className = "col-3"></div>
          <div className = {`col-6 ${styles.top_container}`}>
          <div className = {styles.paragraphs}>
          <div className = {styles.instructions}>
            Instructions
          </div>
          <ol>
            {recipe.paragraphs?.map((paragraph) => (
                <li key={paragraph} className={styles.paragraph}>{paragraph}</li>
              ))}
          </ol>
            </div>
          </div>
          <div className = "col-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const BackendURL = process.env.AXIOS_URL + `/api/recipes/${params.id}`
  const res = await axios.get(BackendURL);
  return {
    props: {
      recipe: res.data,
    },
  };
};

export default Recipe;
