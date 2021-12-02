import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import checkoutApi from "./checkoutApi";

const initialState = {
  products: [],
  checkout: null,
  loading: false,
};

export const buyProducts = createAsyncThunk(
  "checkout/buyProducts",
  async ({ products, totalCost }) => {
    const response = await checkoutApi.checkout(products, totalCost);
    return response.data;
  }
);

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const newProduct = { ...payload, qty: 1 };
      state.products.push(newProduct);
    },
    removeFromCart: (state, { payload }) => {
      state.products = state.products.filter(
        (product) => product._id !== payload
      );
    },
    increaseQty: (state, { payload }) => {
      state.products = state.products.map((product) =>
        product._id === payload ? { ...product, qty: product.qty + 1 } : product
      );
    },
    decreaseQty: (state, { payload }) => {
      state.products = state.products.map((product) =>
        product._id === payload ? { ...product, qty: product.qty - 1 } : product
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(buyProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(buyProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = [];
        state.checkout = payload;
      });
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty } =
  checkoutSlice.actions;

export const checkoutState = (state) => state.checkout;
export const checkoutProducts = (state) => state.checkout.products;
export const checkoutProductsCount = (state) => state.checkout.products.length;
export const checkoutProductsCost = (state) =>
  state.checkout.products.reduce(function (a, b) {
    return a + b["qty"] * b["cost"];
  }, 0);

export default checkoutSlice.reducer;
