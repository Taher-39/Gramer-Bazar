import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserOrders } from "./userApi";

const initialState = {
  orders: [],
  status: "idle",
};

export const fetchUserOrdersAsync = createAsyncThunk(
  "orders/fetchUserOrders",
  async (id) => {
    const response = await fetchUserOrders(id);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload;
      });
  },
});

// export const {  } = userSlice.actions;
export const selectUserOrder = (state) => state.user.orders;

export default userSlice.reducer;
