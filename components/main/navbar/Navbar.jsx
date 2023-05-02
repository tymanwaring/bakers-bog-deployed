import Image from "next/image";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity)
  return (
    <div className={styles.navFade}>
      <nav className={`${styles.navBackground} navbar navbar-dark navbar-expand-lg p-3 sticky-top `} id="headerNav">
        <div className="container-fluid">
          <a className="navbar-brand d-block d-lg-none" href="#">
            <Link href="/#" passHref>
              <Image src="/img/Logo.png" alt="" width="50px" height="50px" />
            </Link>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mx-auto">
              <li className={`${styles.hover} nav-item`}>
                <Link href="/products" passHref>
                  <a className="nav-link mx-2 mt-3 active">Products</a>
                </Link>
              </li>
              <li className={`${styles.hover}`}>
                <Link href="/recipes" passHref>
                  <a className="nav-link mx-2 mt-3 active">Recipes</a>
                </Link>
              </li>

              <li className="nav-item d-none d-lg-block">
                <Link href="/#" passHref>
                  <a className="nav-link mx-2 mt-1" href="#">
                    <Image src="/img/Logo.png" alt="" width="50px" height="50px" />
                    {/* <img src="/static_files/images/logos/logo_2_white.png" height="80" /> */}
                  </a>
                </Link>
              </li>
              <li className={`${styles.hover}`}>
                <Link href="/locations" passHref>
                  <a className="nav-link mx-2 mt-3 active">Locations</a>
                </Link>
              </li>

              <li className={`${styles.hover}`}>
                <Link href="/contact" passHref>
                  <a className="nav-link mx-2 mt-3 active">Contact</a>
                </Link>
              </li>

              <li className={`${styles.clickable} ${styles.hover}`}>
                <Link href="/cart" passHref>
                  <div className="flex-row-reverse">
                    <a className="nav-link mx-2 mt-1">
                      <div>
                        <Image src="/img/cart.png" alt="" width="50px" height="50px" />
                        {quantity}
                      </div>
                    </a>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
