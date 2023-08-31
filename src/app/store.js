import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productList/ProductSlice";
import authReducer from "../features/Auth/AuthSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
  },
});
