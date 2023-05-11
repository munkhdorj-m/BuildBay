import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
  },
  reducers: {
    updateProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { updateProduct } = productSlice.actions;

export default productSlice.reducer;
