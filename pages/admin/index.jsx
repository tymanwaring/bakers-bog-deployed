import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";
import AddButton from "../../components/AddButton";
import AddRecipeBtn from "../../components/RecipeAddBtn/AddRecipeBtn";
import AddRecipe from "../../components/RecipeAddBtn/AddRecipe";
import Add from "../../components/Add";
import TestNav from "../../components/TestNav";

const Index = ({ orders, products, recipes, locations, contacts }) => {
  console.log(contacts)
  const [productList, setProductList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const [recipeList, setRecipeList] = useState(recipes);
  const [contactList, setContactList] = useState(contacts);
  const [locationList, setLocationList] = useState(locations);
  const status = ["preparing", "on the way", "delivered", "done"];
  const [close, setClose] = useState(true)
  const [closeRec, setCloseRec] = useState(true)
  const URL = ("https://www.thebakersbog.com/")


  const handleProductDelete = async (id) => {
    console.log(id);
    const BackendURL = URL + `/api/products/` + id
    console.log(BackendURL)
    try {
      const res = await axios.delete(
        BackendURL
      );
      setProductList(productList.filter((product) => product._id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  const handleContactDelete = async (id) => {
    console.log(id);
    const BackendURL = URL + `/api/contacts/`
    console.log(BackendURL)
    try {
      const res = await axios.delete(
        BackendURL + id
      );
      setContactList(contactList.filter((contact) => contact._id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  const handleRecipeDelete = async (id) => {
    console.log(id);
    const BackendURL = URL + `/api/recipes/`
    try {
      const res = await axios.delete(
        BackendURL + id
      );
      console.log(res)
      setRecipeList(recipeList.filter((recpie) => recpie._id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  const handleOrderDelete = async (id) => {
    console.log(id)
    const BackendURL = URL + `/api/orders/`
    try {
      const res = await axios.delete(
        BackendURL + id
      );
      setOrderList(orderList.filter((order) => order._id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;
    const BackendURL = URL + `/api/orders/`

    if (currentStatus < 3) {
      console.log(item.status)
      try {
        const res = await axios.put(BackendURL + id, {
          status: currentStatus + 1,
        });
        setOrderList([
          res.data,
          ...orderList.filter((order) => order._id !== id),
        ]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handlePrevStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;
    const BackendURL = URL + `/api/orders/`

    if (currentStatus > 0) {
      console.log(item.status)
      try {
        const res = await axios.put(BackendURL + id, {
          status: currentStatus - 1,
        });
        setOrderList([
          res.data,
          ...orderList.filter((order) => order._id !== id),
        ]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>

      <TestNav />
      <div className={styles.container}>

        <div className={styles.item}>

          {/* Products Table */}
          <div className={styles.item}>
            <h1 className={styles.h1}>Products</h1>
            <div className={styles.addbtn}>
              {<AddButton setClose={setClose} />}
              {!close && <Add setClose={setClose} />}
            </div>

            <table className={styles.table}>
              <tbody>
                <tr className={styles.tr}>
                  <th className={styles.th}>Image</th>
                  <th className={styles.th}>Id</th>
                  <th className={styles.th}>Title</th>
                  <th className={styles.th}>Price</th>
                  <th className={styles.th}>Action</th>
                </tr>
              </tbody>
              {productList.map((product) => (
                <tbody key={product._id}>
                  <tr className={styles.tr}>
                    <td className={styles.td}>
                      <Image
                        src={product.img}
                        width={50}
                        height={50}
                        objectFit="cover"
                        alt=""
                      />
                    </td>
                    <td className={styles.td}>{product._id.slice(0, 5)}...</td>
                    <td className={styles.td}>{product.title}</td>
                    <td className={styles.td}>${product.prices[0]}</td>
                    <td className={styles.td}>
                      {/* <button className={styles.button}>Edit</button> */}
                      <button
                        className={styles.button}
                        onClick={() => handleProductDelete(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>


          {/* Recipes Table */}
          <div className={styles.item}>
            <h1 className={styles.h1}>Recipes</h1>
            <div className={styles.addbtn}>
              {<AddRecipeBtn setClose={setCloseRec} />}
              {!closeRec && <AddRecipe setClose={setCloseRec} />}
            </div>
            <table className={styles.table}>
              <tbody>
                <tr className={styles.tr}>
                  <th className={styles.th}>Image</th>
                  <th className={styles.th}>Id</th>
                  <th className={styles.th}>Title</th>
                  <th className={styles.th}>Action</th>
                </tr>
              </tbody>
              {recipeList.map((recipe) => (
                <tbody key={recipe._id}>
                  <tr className={styles.tr}>
                    <td className={styles.td}>
                      <Image
                        src={recipe.img}
                        width={50}
                        height={50}
                        objectFit="cover"
                        alt=""
                      />
                    </td>
                    <td className={styles.td}>{recipe._id.slice(0, 5)}...</td>
                    <td className={styles.td}>{recipe.title}</td>
                    <td className={styles.td}>
                      <button
                        className={styles.button}
                        onClick={() => handleRecipeDelete(recipe._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>


        </div>
        <div className={styles.item}>
          {/* Orders Table */}
          <h1 className={styles.h1}>Orders</h1>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.tr}>
                <th className={styles.th}>Id</th>
                <th className={styles.th}>Customer</th>
                <th className={styles.th}>Total</th>
                <th className={styles.th}>Payment</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Stage</th>
                <th className={styles.th}>Action</th>
              </tr>
            </tbody>
            {orderList.map((order) => (
              <tbody key={order._id}>
                <tr className={styles.trTitle}>
                  <td className={styles.td}>{order._id.slice(0, 5)}...</td>
                  <td className={styles.td}>{order.customer}</td>
                  <td className={styles.td}>${order.total}</td>
                  <td className={styles.td}>
                    {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                  </td>
                  <td className={styles.td}>{status[order.status]}</td>
                  <td className={styles.tdStackedBtn}>
                    <button className={styles.stackedButton} onClick={() => handlePrevStatus(order._id)}>
                      Prev
                    </button>
                    <button className={styles.stackedButton} onClick={() => handleStatus(order._id)}>
                      Next
                    </button>
                  </td>

                  <td className={styles.td}>
                    <button className={styles.button} onClick={() => handleOrderDelete(order._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>

          {/* Contacts Table */}
          <h1 className={styles.h1}>Contacts</h1>
          <table className={styles.table}>
            <tbody className={styles.tbody}>
              <tr className={styles.tr}>
                <th className={styles.th}>Id</th>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}>Message</th>
                <th className={styles.th}>Action</th>
              </tr>
            </tbody>
            {contactList.map((contact) => (
              <tbody key={contact._id}>
                <tr className={styles.trTitle}>
                  <td className={styles.td}>{contact._id.slice(0, 5)}...</td>
                  <td className={styles.td}>{contact.name}</td>
                  <td className={styles.td}>{contact.email}</td>
                  <td className={styles.td}>{contact.message}</td>
                  <td className={styles.td}>
                    <button
                      className={styles.button}
                      onClick={() => handleContactDelete(contact._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>

          {/* <h1 className = {styles.h1}>Fixed Table header</h1> */}
          {/* <div className={styles.tblHeader}>
            <table className = {styles.table} cellpadding="0" cellspacing="0" border="0">
              <thead className = {styles.thead}>
                <tr className = {styles.tr}>
                  <th className = {styles.th}>Code</th>
                  <th className = {styles.th}>Company</th>
                  <th className = {styles.th}>Price</th>
                  <th className = {styles.th}>Change</th>
                  <th className = {styles.th}>Change %</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className={styles.tblContent}>
            <table className = {styles.table} cellpadding="0" cellspacing="0" border="0">
              <tbody>
                <tr className = {styles.tr}>
                  <td className = {styles.td}>AAC</td>
                  <td className = {styles.td}>AUSTRALIAN COMPANY </td>
                  <td className = {styles.td}>$1.38</td>
                  <td className = {styles.td}>+2.01</td>
                  <td className = {styles.td}>-0.36%</td>
                </tr>
                <tr className = {styles.tr}>
                  <td className = {styles.td}>AAD</td>
                  <td className = {styles.td}>AUSENCO</td>
                  <td className = {styles.td}>$2.38</td>
                  <td className = {styles.td}>-0.01</td>
                  <td className = {styles.td}>-1.36%</td>
                </tr>
                </tbody>
                </table>
                </div> */}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const productRes = await axios.get(process.env.AXIOS_URL + "/api/products");
  const orderRes = await axios.get(process.env.AXIOS_URL + "/api/orders");
  const locationRes = await axios.get(process.env.AXIOS_URL + "/api/locations")
  const recipeRes = await axios.get(process.env.AXIOS_URL + "/api/recipes")
  const contactRes = await axios.get(process.env.AXIOS_URL + "/api/contacts")


  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
      locations: locationRes.data,
      recipes: recipeRes.data,
      contacts: contactRes.data,
    },
  };
};

export default Index;
