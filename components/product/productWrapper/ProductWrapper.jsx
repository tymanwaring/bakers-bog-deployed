import styles from "./ProductWrapper.module.css";
import ProductCard from "../productCard/ProductCard";

const ProductWrapper = ({ productList }) => {
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

export default ProductWrapper;
