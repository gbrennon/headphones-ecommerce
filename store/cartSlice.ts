import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ProductType } from "../types";

// Define a type for the slice state
interface CartState {
  cart: ProductType[];
  total: number;
}

// Define the initial state using that type
const initialState: CartState = {
  cart: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      state.cart.push(action.payload);
      state.total = state.cart.reduce((total, item) => total + (item.price * item.count), 0);
    },
    clearCart: (state) => {
      state.cart = [];
      state.total = 0;
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCart = (state: RootState) => state.cart.cart;
export const selectCartTotal = (state: RootState) => state.cart.total;

export default cartSlice.reducer;
