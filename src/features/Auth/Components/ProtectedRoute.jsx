import { Navigate } from "react-router-dom";
import { selectLoggedInuser } from "../AuthSlice";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectLoggedInuser);

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default ProtectedRoute;
