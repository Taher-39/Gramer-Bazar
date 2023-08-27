import Navbar from "../features/navbar/Navbar";
import { Products } from "../features/productList/components/Products";

const Home = () => {
  return (
    <div>
      <Navbar>
        <Products/>
      </Navbar>
    </div>
  );
};

export default Home;
