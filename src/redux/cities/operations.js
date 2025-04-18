import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authInstance = axios.create({
  baseURL: "https://petlove.b.goit.study/api",
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});

export const fetchCities = createAsyncThunk(
  "cities/fetchCities",
  async (keyword, thunkAPI) => {
    //   {
    // "name": "TestName",
    // "email": "test@gmail.com",
    // "password": "1234567" }
    try {
      const { data } = await authInstance.get("/cities/", keyword);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCitiesLocations = createAsyncThunk(
  "users/fetchCitiesLocations",
  async (_, thunkAPI) => {
    // {
    //     "email": "across@mail.com",
    //     "password": "examplepwd12345"
    // }
    try {
      const { data } = await authInstance.get("/cities/locations");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
