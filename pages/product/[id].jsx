import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice"
import TestNav from "../../components/TestNav";
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
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.cover}>
          <TestNav />
          <div className={styles.contents}>
            <div className={styles.side_space}></div>
            <div className={styles.left}>
              <div className={styles.imgContainer}>
                <Image src={product.img} objectFit="contain" layout="fill" alt="" />
              </div>
            </div>
            <div className={styles.padded}>
              <div className={styles.right}>
                <p className={styles.title}>{product.title} ${price}</p>
                <p className={styles.desc}>{product.desc}</p>
                <div>
                  {isOptions ? (
                    <div>
                      <h3 className={styles.choose}>Choose additional ingredients</h3>
                      <div className={styles.ingredients}>
                        {product.extraOptions.map(option => (
                          <div className={styles.option} key={option._id}>
                            <input
                              type="checkbox"
                              id={option.text}
                              name={option.text}
                              className={styles.checkbox}
                              onChange={(e) => handleChange(e, option)}
                            />
                            <label htmlFor="double">{option.text}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>

                <div className={styles.amount}>
                  Amount: <input onChange={(e) => setquantity(e.target.value)} type="number" defaultValue={1} className={styles.quantity} />
                </div>
                <div className={styles.btn}>
                  <button className={styles.button} onClick={handleClick}><span className={styles.icon}><Plus size={96} /></span></button>
                </div>
              </div>
            </div>
            <div className={styles.side_space}></div>
          </div>
        </div>
      </div>
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
