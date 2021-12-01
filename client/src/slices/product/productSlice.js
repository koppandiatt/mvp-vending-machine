import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "./productApi";

const initialState = {
  products: [],
  currentPage: 1,
  totalPages: 1,
  searchQuery: "",
  pageSize: 16,
  loading: false,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({ page, limit, search }) => {
    const response = await productApi.getProducts(page, limit, search);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearchQuery: (state, { payload }) => {
      state.searchQuery = payload;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload.docs;
        state.totalPages = payload.totalPages;
      });
  },
});

export const { setSearchQuery, setCurrentPage } = productSlice.actions;

export const productState = (state) => state.product;

export default productSlice.reducer;
