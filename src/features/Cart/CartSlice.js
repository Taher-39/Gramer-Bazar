import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CartFetch } from './CartAPI';

const initialState = {
  value: 0,
  status: 'idle',
};

export const incrementAsync = createAsyncThunk(
  'counter/CartFetch',
  async (amount) => {
    const response = await CartFetch(amount);
    return response.data;
  }
);

export const CartSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const { increment, } = CartSlice.actions;
export const selectCount = (state) => state.counter.value;

export default CartSlice.reducer;
