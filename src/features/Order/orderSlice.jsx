import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder } from './orderAPI';

const initialState = {
  orderInfo: [],
  status: 'idle',
  currentOrder: null //we may need more info current order 
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderInfo = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orderInfo.push(action.payload);
        state.currentOrder = action.payload
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export const selectOrderInfo = (state) => state.order.orderInfo;
export const selectCurrentOrder = (state) => state.order.currentOrder;

export default orderSlice.reducer;
