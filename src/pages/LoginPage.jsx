import { Login } from "../features/Auth/Components/Login";
import Navbar from "../features/navbar/Navbar";

const LoginPage = () => {
  return (
    <>
      <Navbar>
        <Login />
      </Navbar>
    </>
  );
};

export default LoginPage;
