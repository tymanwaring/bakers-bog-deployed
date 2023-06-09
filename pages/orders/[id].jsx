import styles from "../../styles/Order.module.css";
import Image from "next/image";
import axios from "axios";
import Navbar from "../../components/main/navbar/Navbar";

const Order = ({ order }) => {
  const status = order.status;

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };
  return (
      <div className={styles.container}>
        <div className={styles.cover}>
          <Navbar />
          <div className={styles.contents}>
            <div className={styles.left}>
              <div className={styles.row}>
                <table className={styles.table}>
                  <tbody>
                    <tr className={styles.trTitle}>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Address</th>
                      <th>Total</th>
                    </tr>
                    <tr className={styles.tr}>
                      <td>
                        <span className={styles.id}>{order._id.slice(0, 5)}...</span>
                      </td>
                      <td>
                        <span className={styles.name}>{order.customer}</span>
                      </td>
                      <td>
                        <span className={styles.address}>{order.address}</span>
                      </td>
                      <td>
                        <span className={styles.total}>${order.total}</span>
                      </td>
                    </tr>
                    <tr><br></br></tr>
                    <tr><br></br></tr>
                    <tr><br></br></tr>
                    <tr><br></br></tr>
                    <tr><br></br></tr>
                    <tr>
                      <td>
                        <div className={styles.icon_element}>
                          <div className={statusClass(0)}>
                            <Image src="/img/paid.png" width={45} height={45} alt="" />
                            <span>Payment</span>
                            <div className={styles.checkedIcon}>
                              <Image
                                className={styles.checkedIcon}
                                src="/img/checked.png"
                                width={30}
                                height={30}
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={statusClass(1)}>
                          <Image src="/img/bake.png" width={45} height={45} alt="" />
                          <span>Preparing</span>
                          <div className={styles.checkedIcon}>
                            <Image
                              className={styles.checkedIcon}
                              src="/img/checked.png"
                              width={20}
                              height={20}
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={statusClass(2)}>
                          <Image src="/img/bike.png" width={45} height={45} alt="" />
                          <span>On the way</span>
                          <div className={styles.checkedIcon}>
                            <Image
                              className={styles.checkedIcon}
                              src="/img/checked.png"
                              width={30}
                              height={30}
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={statusClass(3)}>
                          <Image src="/img/delivered.png" width={45} height={45} alt="" />
                          <span>Delivered</span>
                          <div className={styles.checkedIcon}>
                            <Image
                              className={styles.checkedIcon}
                              src="/img/checked.png"
                              width={20}
                              height={20}
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.side_space}></div>
            <div className={styles.right}>
              <div className={styles.wrapper}>
                <h2 className={styles.title}>BASKET TOTAL</h2>
                {/* <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${order.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div> */}
                <div className={styles.totalText}>
                  <b className={styles.totalTextTitle}>Total:</b>${order.total}
                </div>
                <button disabled className={styles.button}>
                  PAID
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const BackendURL = process.env.AXIOS_URL + `/api/orders/${params.id}`
  const res = await axios.get(BackendURL);
  return {
    props: { order: res.data },
  };
};

export default Order;
