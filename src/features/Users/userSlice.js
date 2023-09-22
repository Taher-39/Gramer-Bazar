import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUser, fetchUserOrders, updateUser } from "./userApi";

const initialState = {
  status: "idle",
  userInfo: null,
};

export const fetchUserOrdersAsync = createAsyncThunk(
  "users/fetchUserOrders",
  async (id) => {
    const response = await fetchUserOrders(id);
    return response.data;
  }
);
export const fetchLoggedInUserAsync = createAsyncThunk(
  "users/fetchLoggedInUser",
  async (id) => {
    const response = await fetchLoggedInUser(id);
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  "users/updateUser",
  async (userData) => {
    const response = await updateUser(userData);
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
        state.userInfo.orders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      });
  },
});

// export const {  } = userSlice.actions;
export const selectUserOrder = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
