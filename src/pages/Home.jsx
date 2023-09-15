import Footer from "../features/Common/Fotter";
import Navbar from "../features/navbar/Navbar";
import { Products } from "../features/productList/components/Products";

const Home = () => {
  return (
    <>
      <Navbar>
        <Products />
      </Navbar>
      <Footer />
    </>
  );
};

export default Home;
