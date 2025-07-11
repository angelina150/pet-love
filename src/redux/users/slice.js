import { createSlice } from '@reduxjs/toolkit';

import {
  addPets,
  fetchUserFullInfo,
  fetchUserInfo,
  loginUser,
  logout,
  registerUser,
  removePet,
  updateUser,
} from '../users/operations';

const initialState = {
  data: {},
  userFullInfo: {},
  userInfo: {},
  token: null,
  error: null,
  loading: false,
  isLoggedIn: false,
  loadingRemovePet: false,
  loadingUserInfo: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUserState: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
      })
      .addCase(fetchUserFullInfo.pending, state => {
        state.loadingUserInfo = true;
        state.error = null;
      })
      .addCase(fetchUserFullInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loadingUserInfo = false;
        state.error = null;
        state.userFullInfo = action.payload;
      })
      .addCase(fetchUserFullInfo.rejected, (state, action) => {
        state.loadingUserInfo = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserInfo.pending, state => {
        state.loadingUserInfo = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loadingUserInfo = false;
        state.error = null;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loadingUserInfo = false;
        state.error = action.payload;
      })
      .addCase(addPets.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPets.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removePet.pending, state => {
        state.loadingRemovePet = true;
        state.error = null;
      })
      .addCase(removePet.fulfilled, state => {
        state.loadingRemovePet = false;
        state.error = null;
      })
      .addCase(removePet.rejected, (state, action) => {
        state.loadingRemovePet = false;
        state.error = action.payload;
      });
  },
});

export const usersReducer = usersSlice.reducer;
export const { clearUserState } = usersSlice.actions;
