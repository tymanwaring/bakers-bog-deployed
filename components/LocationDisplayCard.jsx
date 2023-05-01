import Image from "next/image";
import styles from "../styles/LocationCard.module.css";
import Link from "next/link";

const LocationDisplayCard = ({ location }) => {
  return (
    <div className={styles.container}>
      {/* <Link href={`/product/${product._id}`} passHref>
        <Image src={product.img} alt="" width="500" height="500" />
      </Link> */}
      <h1 className={styles.title}>{location.title}</h1>
      <h2 className={styles.address}>{location.address}</h2>
      {/* <span className={styles.price}>${product.prices[0]}</span>*/}
      <p className={styles.desc}>{location.desc}</p>
    </div>
  );
};

export default LocationDisplayCard;
