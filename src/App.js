import Home from "./pages/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProtectedRoute from "./features/Auth/Components/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInuser } from "./features/Auth/AuthSlice";
import { fetchCartByIdAsync } from "./features/Cart/CartSlice";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute>
        <CartPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute>
        <CheckoutPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/products/:id",
    element: (
      <ProtectedRoute>
        <ProductDetailsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <ProtectedRoute>
        <OrderSuccessPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user-orders",
    element: (
      <ProtectedRoute>
        <UserOrdersPage />
      </ProtectedRoute>
    ),
  },
]);

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInuser);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartByIdAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
