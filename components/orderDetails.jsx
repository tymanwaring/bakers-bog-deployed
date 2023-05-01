import styles from "../styles/OrderDetails.module.css"
import { useEffect, useState } from "react";

const OrderDetails = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [active, setActive] = useState(false)
  // const [phone, setPhone] = useState("");

  const phoneValidation = (inputtxt) => {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (inputtxt.match(phoneno)) {
      document.getElementById("tel").classList.add(styles.hidden);
      setActive(true)
    }
    else {
      setActive(false)
    }
  }

  const phoneBlurValidation = (inputtxt) => {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!inputtxt.match(phoneno)) {
      document.getElementById("tel").classList.remove(styles.hidden);
      document.getElementById("tel").classList.add(styles.tel_err);
      setActive(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>You will pay ${total} after delivery.</h1>
        <div className={styles.item}>
          <label className={styles.label}>Name Surname</label>
          <input
            placeholder="John Doe"
            type="text"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="tel"
            placeholder="XXX-XXX-XXXX"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            className={styles.input}
            onChange={(e) => phoneValidation(e.target.value)}
            onBlur={(e) => phoneBlurValidation(e.target.value)}
          />
          <span id="tel" className={styles.hidden}>Please provide a valid phone number format (XXX-XXX-XXXX)</span>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <textarea
            rows={5}
            placeholder="Elton St. 505 NY"
            type="text"
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button
          id="subBtn"
          className={styles.button}
          onClick={() => createOrder({ customer, address, total, method: 0 })}
          disabled = {!active}
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetails