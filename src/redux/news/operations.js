import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authInstance = axios.create({
  baseURL: "https://petlove.b.goit.study/api",
  headers: { "Content-Type": "application/json" },
});

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async ({ keyword, page, limit }, thunkAPI) => {
    try {
      const { data } = await authInstance.get("/news", {
        params: {
          keyword,
          page,
          limit,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
