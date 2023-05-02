import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice"
import Navbar from "../../components/main/navbar/Navbar";
import { Plus } from 'react-bootstrap-icons';

const Product = ({ product }) => {
  const [price, setPrice] = useState(product.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setquantity] = useState(1);
  const [extras, setExtras] = useState([])
  const dispatch = useDispatch()
  let isOptions = product.extraOptions

  if (isOptions.length == 0) {
    isOptions = false
  }

  const changePrice = (number) => {
    setPrice(price + number)
  }

  const handleSize = (sizeIndex) => {
    const difference = product.prices[sizeIndex] - product.prices[size]
    setSize(sizeIndex)
    changePrice(difference)
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked

    if (checked) {
      changePrice(option.price)
      setExtras(prev => [...prev, option])
    }
    else {
      changePrice(-option.price)
      setExtras(extras.filter(extra => extra._id !== option._id))
    }
  }

  const handleClick = () => {
    dispatch(addProduct({ ...product, extras, price, quantity }))
  }


  return (
    <div className={`${styles.cover} ${styles.container}`}>
      <Navbar />
      <div className = {styles.spacer}><br></br></div>
      <div className={`container h-100`}>
        <div className="row">
          <div className={`col-md`}>
                <div className={styles.imgContainer}>
                  <Image src={product.img} objectFit="scale-down" height="500" width="600" alt="" />
                </div>
          </div>
          {/* <div class = "col-2"></div> */}
          <div className={`col-md`}>
            <div className={styles.contents}>
              <div className={styles.right}>
                <p className={styles.title}>{product.title} ${price}</p>
                <p className={styles.desc}>{product.desc}</p>
                <div className={styles.amount}>
                  Amount: <input onChange={(e) => setquantity(e.target.value)} type="number" defaultValue={1} className={styles.quantity} />
                </div>
                <div className={styles.btn}>
                  <button className={`btn btn-dark ${styles.btn_color}`} onClick={handleClick}><span className={styles.icon}><Plus size={96} /></span></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className = {styles.spacer}><br></br></div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const BackendURL = process.env.AXIOS_URL + `/api/products/${params.id}`
  const res = await axios.get(BackendURL);
  return {
    props: {
      product: res.data,
    },
  };
};

export default Product;
