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
