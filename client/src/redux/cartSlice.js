import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: [],
  temporaryCart: [],
  isLoading: false,
  error: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCart: (state) => {
      state.isLoading = true;
    },
    getCartSuccess: (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
    },
    getCartFailed: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    deleteCart: (state) => {
      state.cart = null;
    },
    handleProductToTemporaryCart: (state, action) => {
      if (!state.temporaryCart) {
        state.temporaryCart = [];
      }
      const { productId } = action.payload;
      const existingProductIndex =
        state.temporaryCart.length > 0
          ? state.temporaryCart.findIndex(
              (product) => product.productId === productId
            )
          : -1;
      if (existingProductIndex !== -1) {
        state.temporaryCart = state.temporaryCart.filter(
          (product) => product.productId !== productId
        );
      } else {
        state.temporaryCart.push(action.payload);
      }
    },
  },
});

export const {
  getCart,
  getCartSuccess,
  getCartFailed,
  deleteCart,
  handleProductToTemporaryCart,
} = cartSlice.actions;

export default cartSlice.reducer;
