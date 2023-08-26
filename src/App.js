import React from "react";
import Home from "./pages/Home";
import LoginPages from "./pages/LoginPages";
import SignupPages from "./pages/SignupPages";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Cart } from "./features/Cart/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPages />,
  },
  {
    path: "/signup",
    element: <SignupPages />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
