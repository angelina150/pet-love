import { createSlice } from "@reduxjs/toolkit";
import { fetchNews } from "./operations.js";

const initialState = {
  news: [],
  error: null,
  loading: false,
  totalPages: null,
  page: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.news = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const newsReducer = newsSlice.reducer;
