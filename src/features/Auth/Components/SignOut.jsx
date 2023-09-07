import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInuser, signOutAsync } from "../AuthSlice";
import { useEffect } from "react";

const SignOut = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInuser);

  useEffect(() => {
    dispatch(signOutAsync());
  }, [dispatch]);

  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
};

export default SignOut;
