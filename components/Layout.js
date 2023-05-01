import Footer from "./Footer";
import Navbar from "./Navbar";
import TestNav from "./TestNav";

const Layout = ({ children }) => {
  const type = children.type.name;
  return (
    <>
      {/* <Navbar /> */}

      {children}

      {/* <Footer /> */}
    </>
  );
};

export default Layout;
