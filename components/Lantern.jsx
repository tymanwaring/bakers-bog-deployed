import styles from "../styles/Lantern.module.css";
import Image from "next/image";
import { useState } from "react";

const Lantern = () => {
    return (
        <div className="container">
            <div className="row"><br></br></div>
            <div className="row"><br></br></div>
            <div className="row"><br></br></div>
            <div className="row"><br></br></div>
            <div className="row"><br></br></div>
            <div className="row"><br></br></div>
            <div className="row"><br></br></div>
            <div className="row"><br></br></div>
            <div className="row"><br></br></div>
            <div className="row">
                <div className="col-12 text-center">
                    <div className={`display-1 text-white ${styles.customFont}`}>The Baker's Bog</div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className={styles.stage}>
                        <div className={styles.scene}>
                            <div className={styles.lantern}>
                                <div className={styles.lanternHandle}></div>
                                <div className={styles.lanternInner}>
                                    <div className={styles.lanternChain}></div>
                                    <div className={styles.lanternHead}></div>
                                    <div className={styles.lanternBody}>
                                        <div className={styles.lanternSpark}></div>
                                        <div className={styles.lanternSpark}></div>
                                        <div className={styles.lanternSpark}></div>
                                        <div className={styles.lanternFlame}></div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.planet}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lantern;
