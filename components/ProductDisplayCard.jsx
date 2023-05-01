import Image from "next/image";
import styles from "../styles/ProductDisplayCard.module.css";
import Link from "next/link";
import { forwardRef } from 'react';

const ProductDisplayCard = ({ product }) => {
    return (
        <div>
            <div className="container text-center">
                <div className={styles.padding}></div>
                <div className="row">
                    <div className={`col-12`}>
                        <Link href={`/product/${product._id}`} passHref>
                            <div className={`${styles.innerbox} ${styles.clickable}`} style={{ background: `url(${product.img})` }} width='500px' height='500px' >
                                {/* <Image className = {`${styles.clickable} ${styles.hide}`} src={product.img} alt="" width= '500px' height = '500px'/> */}
                                <div className={styles.hiddenText}>
                                    <h1 className={styles.title}>{product.title}</h1>
                                    <span className={styles.price}>${product.prices[0]}</span>
                                    <p className={styles.desc}>{product.desc}</p>
                                </div>
                            </div>
                        </Link>
                        {/* <h1 className={styles.title}>{product.title}</h1>
                        <div className={styles.hide}>I am shown when someone hovers over the div above.</div>
                        <span className={styles.price}>${product.prices[0]}</span>
                        <p className={styles.desc}>{product.desc}</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDisplayCard;
