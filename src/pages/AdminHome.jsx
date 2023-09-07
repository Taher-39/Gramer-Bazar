import { AdminProducts } from "../features/Admin/AdminProducts";
import Navbar from "../features/navbar/Navbar";

const AdminHome = () => {
  return (
    <>
      <Navbar>
        <AdminProducts />
      </Navbar>
    </>
  );
};

export default AdminHome;
