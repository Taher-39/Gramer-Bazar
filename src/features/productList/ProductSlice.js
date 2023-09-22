import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchProductById,
  fetchProductsBrands,
  fetchProductsByFilters,
  fetchProductsCategory,
  updateProduct,
} from "./PoductApi";

const initialState = {
  products: [],
  category: [],
  brands: [],
  status: "idle",
  totalItems: 0,
  selectedProduct: null,
};

export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);
export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async ({ filter, sort, pagination, admin }) => {
    const response = await fetchProductsByFilters(filter, sort, pagination, admin);
    return response.data;
  }
);

export const fetchProductsCategoryAsync = createAsyncThunk(
  "product/fetchProductsCategory",
  async () => {
    const response = await fetchProductsCategory();
    return response.data;
  }
);

export const fetchProductsBrandsAsync = createAsyncThunk(
  "product/fetchProductsBrands",
  async () => {
    const response = await fetchProductsBrands();
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductsBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchProductsCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.category = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
        state.selectedProduct = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export const selectAllProduct = (state) => state.product.products;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectAllCategory = (state) => state.product.category;
export const selectAllBrand = (state) => state.product.brands;
export const selectProductStatus = (state) => state.product.status;

export default productSlice.reducer;
