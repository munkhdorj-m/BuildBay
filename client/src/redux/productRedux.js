import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    id: null,
  },
  reducers: {
    updateProductId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { updateProductId } = productSlice.actions;

export default productSlice.reducer;
