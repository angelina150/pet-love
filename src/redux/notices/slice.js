import { createSlice } from '@reduxjs/toolkit';
import {
  addFavoritesNotices,
  fetchNoticeById,
  fetchNotices,
  fetchNoticesCategories,
  fetchNoticesSex,
  fetchNoticesSpecies,
  removeFavoritesNoticesById,
} from './operations.js';

const initialState = {
  data: [],
  notices: [],
  categories: [],
  sex: [],
  species: [],
  favorites: [],
  noticeById: [],
  error: null,
  loading: false,
  loadingFavorites: false,
};

const noticesSlice = createSlice({
  name: 'notices',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchNotices.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.notices = action.payload.results;
        state.data = action.payload;
      })
      .addCase(fetchNotices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchNoticesCategories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNoticesCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categories = action.payload;
      })
      .addCase(fetchNoticesCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchNoticesSex.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNoticesSex.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.sex = action.payload;
      })
      .addCase(fetchNoticesSex.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchNoticesSpecies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNoticesSpecies.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.species = action.payload;
      })
      .addCase(fetchNoticesSpecies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addFavoritesNotices.pending, state => {
        state.loadingFavorites = true;
        state.error = null;
      })
      .addCase(addFavoritesNotices.fulfilled, state => {
        state.loadingFavorites = false;
        state.error = null;
      })
      .addCase(addFavoritesNotices.rejected, (state, action) => {
        state.loadingFavorites = false;
        state.error = action.payload;
      })
      .addCase(fetchNoticeById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNoticeById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.noticeById = action.payload;
      })
      .addCase(fetchNoticeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFavoritesNoticesById.pending, state => {
        state.loadingFavorites = true;
        state.error = null;
      })
      .addCase(removeFavoritesNoticesById.fulfilled, state => {
        state.loadingFavorites = false;
        state.error = null;
      })
      .addCase(removeFavoritesNoticesById.rejected, (state, action) => {
        state.loadingFavorites = false;
        state.error = action.payload;
      });
  },
});

export const noticesReducer = noticesSlice.reducer;
