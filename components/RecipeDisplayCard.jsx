import Image from "next/image";
import styles from "../styles/RecepieDisplayCard.module.css";
import Link from "next/link";
import { forwardRef } from 'react';

const RecipeDisplayCard = ({ recipe }) => {

    let prep_time = parseInt(recipe.prep_time.replace(/\D/g, ''))
    let cook_time = parseInt(recipe.cook_time.replace(/\D/g, ''))

    let total_time = prep_time + cook_time

    return (
        <div>
            <div className="container text-center">
                <div className={styles.padding}></div>
                <div className="row">
                    <div className={`col-12`}>
                        <Link href={`/recipe/${recipe._id}`} passHref>
                            <div className={`${styles.innerbox} ${styles.clickable}`} style={{ background: `url(${recipe.img})` }} width='500px' height='500px' >
                                {/* <Image className = {`${styles.clickable} ${styles.hide}`} src={product.img} alt="" width= '500px' height = '500px'/> */}
                                <div className={styles.hiddenText}>
                                    <h1 className={styles.title}>{recipe.title}</h1>
                                    <p className={styles.mixer}></p>
                                    {/* <p className={styles.prep}><Image src="/img/mixer.png" alt="" width="100px" height="100px"/> {recipe.prep_time}</p> */}
                                    <p className={styles.cook}><Image src="/img/stopwatch.png" alt="" width="100px" height="100px" /> {total_time} </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDisplayCard;
