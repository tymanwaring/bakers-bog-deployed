import Footer from "./Footer";
import Navbar from "./Navbar";
import TestNav from "./TestNav";

const Layout = ({ children }) => {
  const type = children.type.name;
  return (
    <>
      {/* <Navbar /> */}
      {(type == "Home" || type == "Products" || type == "Locations" || type == "Contact" || type == "Cart" || type == "Product" || type == "Order" || type == "Recipes" || type == "Recipe") ? (
        false
      ) : (
        <TestNav />
      )}

      {children}

      {/* <Footer /> */}
    </>
  );
};

export default Layout;
