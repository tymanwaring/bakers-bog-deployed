import styles from "./LocationCard.module.css";

const LocationCard = ({ location }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{location.title}</h1>
      <h2 className={styles.address}>{location.address}</h2>
      <p className={styles.desc}>{location.desc}</p>
    </div>
  );
};

export default LocationCard;
