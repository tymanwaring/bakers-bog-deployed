import styles from "../styles/ProductDisplay.module.css";
import ProductCard from "./ProductDisplayCard";

const ProductDisplay = ({ productList }) => {
  return (
    <div className={styles.container}>
      {/* <div className = {styles.titlePadding}> */}
      {/* <h1 className= {styles.title}>Welcome to The Shop</h1> */}
      {/* </div> */}
      <div className={styles.wrapper}>
        {productList?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductDisplay;
