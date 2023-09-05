import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/Users/components/UserOrders";

const UserOrdersPage = () => {
  return (
    <>
      <Navbar>
        <UserOrders />
      </Navbar>
    </>
  );
};

export default UserOrdersPage;
