import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
    currentPage: 1,
    productsPerPage: 8
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  }
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  setCurrentPage
} = productSlice.actions;

export default productSlice.reducer;
