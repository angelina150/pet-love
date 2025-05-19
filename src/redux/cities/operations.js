import { createAsyncThunk } from "@reduxjs/toolkit";
import { authInstance } from "../users/operations.js";

export const fetchCities = createAsyncThunk(
  "cities/fetchCities",
  async (keyword, thunkAPI) => {
    try {
      const { data } = await authInstance.get("/cities/", {
        params: { keyword },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCitiesLocations = createAsyncThunk(
  "users/fetchCitiesLocations",
  async (_, thunkAPI) => {
    try {
      const { data } = await authInstance.get("/cities/locations");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
