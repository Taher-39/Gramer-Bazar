import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productList/ProductSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
