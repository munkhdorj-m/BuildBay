import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeItem: (state, action) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload
      );
      if (index !== -1) {
        state.total -=
          state.products[index].price * state.products[index].quantity;
        state.quantity -= 1;
        state.products.splice(index, 1);
      }
    },
    resetCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, removeItem, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
