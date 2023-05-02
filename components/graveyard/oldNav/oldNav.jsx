// import Image from "next/image";
// import styles from "../styles/Navbar.module.css";
// import Link from "next/link";
// import { useSelector } from "react-redux";
// import AddButton from "../AddButton"

// const Navbar = () => {

//   const quantity = useSelector(state => state.cart.quantity)
//   return (
//     <div className={styles.container}>
//       <div className={styles.item}>
//         <div className={styles.callButton}>
//           <Image src="/img/telephone.png" alt="" width="32" height="32" />
//         </div>
//         <div className={styles.texts}>
//           <div className={styles.text}>ORDER NOW!</div>
//           <div className={styles.text}>(123) 345-6789</div>
//         </div>
//       </div>
//       <div className={styles.item}>
//         <ul className={styles.list}>
//           <Link href="/products" passHref>
//             <li className={styles.listItem}>Products</li>
//           </Link>
//           <Link href="/recepies" passHref>
//             <li className={styles.listItem}>Recepies</li>
//           </Link>
//           <Link href="/" passHref>
//             <div className={styles.logoBoarder}>
//               <Image src="/img/WhiskTree.png" alt="" width="100px" height="100px" />
//             </div>
//           </Link>
//           <Link href="/locations" passHref>
//             <li className={styles.listItem}>Locations</li>
//           </Link>
//           <Link href="/contact" passHref>
//             <li className={styles.listItem}>Contact</li>
//           </Link>
//         </ul>
//       </div>

//       <div className={styles.item}>
//         <Link href="/cart" passHref>
//           <div className={styles.cart}>
//             <Image src="/img/cart.png" alt="" width="30px" height="30px" />
//             <div className={styles.counter}>{quantity}</div>
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
