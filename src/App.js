import React from "react";
import Home from "./pages/Home";
import LoginPages from "./pages/LoginPages";
import SignupPages from "./pages/SignupPages";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
