import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authInstance = axios.create({
  baseURL: "https://petlove.b.goit.study/api",
  headers: { "Content-Type": "application/json" },
});

export const fetchNotices = createAsyncThunk(
  "notices/fetchNotices",
  async (
    {
      keyword,
      category,
      species,
      locationId,
      byDate,
      byPrice,
      byPopularity,
      page,
      limit,
      sex,
    },
    thunkAPI
  ) => {
    try {
      const { data } = await authInstance.get("/notices", {
        params: {
          keyword,
          category,
          species,
          locationId,
          byDate,
          byPrice,
          byPopularity,
          page,
          limit,
          sex,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchNoticesCategories = createAsyncThunk(
  "notices/fetchNoticesCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await authInstance.get("/notices/categories");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
