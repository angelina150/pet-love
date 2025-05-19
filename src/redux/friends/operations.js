import { createAsyncThunk } from "@reduxjs/toolkit";
import { authInstance } from "../users/operations.js";

export const fetchFriends = createAsyncThunk(
  "friends/fetchFriends",
  async (_, thunkAPI) => {
    try {
      const { data } = await authInstance.get("/friends/");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
