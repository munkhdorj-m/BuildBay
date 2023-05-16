import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
  },
  reducers: {
    updateOrder: (state, action) => {
      state.order = action.payload;
    },
    createOrderSuccess: (state, action) => {
      state.isFetching = false;
    },
    createOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { updateOrder, createOrderSuccess, createOrderFailure } =
  orderSlice.actions;
export default orderSlice.reducer;
