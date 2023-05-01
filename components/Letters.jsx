import styles from "../styles/Letters.module.css";
import Image from "next/image";
import { useState } from "react";

const Letters = () => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.letterH1}>
                <div className={styles.ribbon}>
                    <figure className={styles.letterWrapper}>
                        <span className={`${styles.letter} ${styles.l}`}>
                            <span className={styles.l}>
                                <span className={styles.bottom}></span>
                            </span>
                        </span>
                    </figure>
                </div>
            </h1>




        </div>
    );
};

export default Letters;
