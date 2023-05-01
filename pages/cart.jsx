import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import { deleteProduct } from "../redux/cartSlice"
import { changeTotal } from "../redux/cartSlice"
import OrderDetails from "../components/orderDetails";
import TestNav from "../components/TestNav";
import { Trash } from 'react-bootstrap-icons';



const Cart = ( products ) => {
  // This values are the props in the UI
  const cart = useSelector((state) => state.cart)
  const [open, setOpen] = useState(false)
  const [cash, setCash] = useState(false)
  const amount = cart.total;
  const currency = "USD";
  const style = { "layout": "vertical" };
  const dispatch = useDispatch()
  const router = useRouter()
  const URL  = ("https://bakers-bog-deployed.vercel.app/api/orders")

  const createOrder = async (data) => {
    try {
      const res = await axios.post(URL, data)
      console.log(res)
      console.log(res.data._id)
      if (res.status === 201 && router.push("/orders/" + res.data._id)) {
        dispatch(reset())
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleClick = (e) => {
    var row = e.target.closest("tr")
    let id = (row.firstChild.innerText)
    let price = (parseInt(row.children[5].innerText.substring(1)))
    console.log(price)
    // var text = row.find(".nr").text()

    // alert(text)
    dispatch(deleteProduct(id))
    dispatch(changeTotal(price))
  }

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);


    return (<>
      {(showSpinner && isPending) && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function (details) {
            const shipping = details.purchase_units[0].shipping
            createOrder({
              customer: shipping.name.full_name,
              address: shipping.address.address_line_1,
              total: cart.total,
              method: 1, //for cash 0 for paypal 1
            })
          });
        }}
      />
    </>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        <TestNav />
        <div className={styles.contents}>
          <div className={styles.left}>
            <table className={styles.table}>
              <tbody className = {styles.tableTitles}>
                <tr className={styles.trTitle}>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>

                {cart.products.map(product => (

                  <tr className={styles.tr} key={product._id}>
                    <td className = {styles.hidden}>
                      <span className={styles.price}>{product._id}</span>
                    </td>
                    <td>
                      <div className={styles.imgContainer}>
                        <Image
                          src={product.img}
                          layout="fill"
                          objectFit="cover"
                          alt=""
                        />
                      </div>
                    </td>
                    <td>
                      <span className={styles.name} id = "title">{product.title}</span>
                    </td>
                    <td>
                      <span className={styles.price}>${product.price}</span>
                    </td>
                    <td>
                      <span className={styles.quantity}>{product.quantity}</span>
                    </td>
                    <td>
                      <span className={styles.total}>${product.price * product.quantity}</span>
                    </td>
                    <td>
                      <span id = "btn" className = {styles.trash} onClick={(e) => handleClick(e)}><Trash size={32} /></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.mid}></div>
          <div className={styles.right}>
            <div className={styles.wrapper}>
              <h2 className={styles.title}>Basket Total</h2>
              <div className={styles.totalTextTitle}>
                ${cart.total}
              </div>

              {open ? (
                <div className={styles.paymentMethods}>
                  <button
                    className={styles.payButton}
                    onClick={() => setCash(true)}
                  >
                    Pay With Cash
                  </button>
                  <PayPalScriptProvider
                    options={{
                      "client-id": "ASoIUpqJBkE4du_euRYzFU3mesFsui24bGR5g4wijTqXKMZnfCVgK27evsXK5AFH0ORjnbJ7YMNcBrTo",
                      components: "buttons",
                      currency: "USD",
                      "disable-funding": "credit,card,p24",
                    }}
                  >
                    <ButtonWrapper
                      currency={currency}
                      showSpinner={false}
                    />
                  </PayPalScriptProvider>
                </div>
              ) : (
                <button onClick={() => setOpen(true)} className={styles.button}>CHECKOUT NOW!</button>
              )}

            </div>
          </div>
          {cash && <OrderDetails total={cart.total} createOrder={createOrder} />}
        </div>
      </div>
    </div>
  );
};

export default Cart;
