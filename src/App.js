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
import { fetchCartByIdAsync } from "./features/Cart/CartSlice";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/Users/userSlice";
import { selectLoggedInuser } from "./features/Auth/AuthSlice";
import SignOut from "./features/Auth/Components/SignOut";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailsPage from "./pages/AdminProductDetailsPage";
import ProtectedAdminRoute from "./features/Auth/Components/ProtectedAdminRoute";
import AboutPage from "./pages/AboutPage";
import AddNewProductPage from "./pages/AdminProductFormPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdminRoute>
        <AdminHome />
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/admin/products/:id",
    element: (
      <ProtectedAdminRoute>
        <AdminProductDetailsPage />
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/admin/add-product",
    element: (
      <ProtectedAdminRoute>
        <AdminProductFormPage />
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/admin/product/edit/:id",
    element: (
      <ProtectedAdminRoute>
        <AdminProductFormPage />
      </ProtectedAdminRoute>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdminRoute>
        <AdminOrdersPage />
      </ProtectedAdminRoute>
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
    path: "/order-success/:id",
    element: (
      <ProtectedRoute>
        <OrderSuccessPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-orders",
    element: (
      <ProtectedRoute>
        <UserOrdersPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <UserProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sign-out",
    element: <SignOut />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
]);

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInuser);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartByIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <>
      <Provider template={AlertTemplate} {...options}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
};

export default App;
