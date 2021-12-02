import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "./productApi";

const initialState = {
  products: [],
  selected: null,
  currentPage: 1,
  totalPages: 1,
  searchQuery: "",
  pageSize: 16,
  error: "",
  loading: false,
};

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({ page, limit, search }) => {
    const response = await productApi.getProducts(page, limit, search);
    return response.data;
  }
);

export const fetchSellerProducts = createAsyncThunk(
  "product/fetchSellerProducts",
  async ({ page, limit, search }) => {
    const response = await productApi.getSellerProducts(page, limit, search);
    return response.data;
  }
);

export const createProduct = createAsyncThunk(
  "product/create",
  async (product) => {
    const response = await productApi.create(product);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async (product) => {
    const response = await productApi.update(product);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk("product/delete", async (id) => {
  const response = await productApi.delete(id);
  return response.data;
});

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
    editProduct: (state, { payload }) => {
      state.selected = payload;
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
      })
      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload.docs;
        state.totalPages = payload.totalPages;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products.unshift(payload);
        state.products.pop();
      })
      .addCase(createProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = state.products.map((product) =>
          product._id === payload._id ? { ...product, ...payload } : product
        );
      })
      .addCase(updateProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== payload
        );
      });
  },
});

export const { setSearchQuery, setCurrentPage, editProduct } =
  productSlice.actions;

export const productState = (state) => state.product;

export default productSlice.reducer;
