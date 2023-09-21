import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AddToCart,
  RemoveCartItem,
  UpdateCart,
  fetchCartById,
  restCart,
} from "./CartAPI";

const initialState = {
  status: "idle",
  items: [],
  error: null,
};

export const AddToCartAsync = createAsyncThunk(
  "cart/AddToCart",
  async (item) => {
    const response = await AddToCart(item);
    return response.data;
  }
);
export const fetchCartByIdAsync = createAsyncThunk(
  "cart/fetchCartById",
  async (id) => {
    const response = await fetchCartById(id);
    return response.data;
  }
);

export const UpdateCartAsync = createAsyncThunk(
  "cart/UpdateCart",
  async (update) => {
    const response = await UpdateCart(update);
    return response.data;
  }
);
export const RemoveCartItemAsync = createAsyncThunk(
  "cart/RemoveCartItem",
  async (itemId) => {
    const response = await RemoveCartItem(itemId);
    return response.data;
  }
);
export const restCartAsync = createAsyncThunk(
  "cart/restCart",
  async (userId) => {
    const response = await restCart(userId);
    return response.data;
  }
);

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchCartByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(UpdateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(UpdateCartAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(RemoveCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(RemoveCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(RemoveCartItemAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(restCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(restCartAsync.fulfilled, (state) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const { increment } = CartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartError = (state) => state.cart.error;

export default CartSlice.reducer;
