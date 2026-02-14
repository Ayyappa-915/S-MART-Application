import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    category: "all",
    sort: "",
    minPrice: "",
    maxPrice: "",
    search: ""
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    resetFilters: (state) => {
      state.category = "all";
      state.sort = "";
      state.minPrice = "";
      state.maxPrice = "";
      state.search = "";
    }
  }
});

export const {
  setCategory,
  setSort,
  setMinPrice,
  setMaxPrice,
  setSearch,
  resetFilters
} = filterSlice.actions;

export default filterSlice.reducer;
