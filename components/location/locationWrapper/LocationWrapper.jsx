import styles from "./LocationWrapper.module.css";
import LocationCard from "../locationCard/LocationCard";

const LocationWrapper = ({ locationList }) => {
  return (
    <div className={styles.container}>
      <div className={styles.titlePadding}>
        <h1 className={styles.title}>Find Fresh Bread Near You</h1>
      </div>
      <div className={styles.wrapper}>
        {locationList?.map((location) => (
          <LocationCard key={location._id} location={location} />
        ))}
      </div>
    </div>
  );
};

export default LocationWrapper;
