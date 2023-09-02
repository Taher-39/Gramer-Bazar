import Navbar from "../features/navbar/Navbar";
import { Products } from "../features/productList/components/Products";

const Home = () => {
  return (
    <>
      <Navbar>
        <Products/>
      </Navbar>
    </>
  );
};

export default Home;
