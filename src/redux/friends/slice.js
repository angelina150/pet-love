import { createSlice } from "@reduxjs/toolkit";
import { fetchFriends } from "./operations.js";

const initialState = {
  data: {},
  token: null,
  error: null,
  loading: false,
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.friends = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const friendsReducer = friendsSlice.reducer;
