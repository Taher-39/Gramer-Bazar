import { Navigate } from "react-router-dom";
import { selectLoggedInuser } from "../AuthSlice";
import { useSelector } from "react-redux";

const ProtectedAdminRoute = ({ children }) => {
  const user = useSelector(selectLoggedInuser);

  if (!user) {
    return <Navigate to={"/login"} replace={true} />;
  }
  if (user && user.role !== 'admin') {
    return <Navigate to={"/"} replace={true} />;
  }

  return children;
};

export default ProtectedAdminRoute;
