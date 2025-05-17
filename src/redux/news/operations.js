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
      const params = {};
      if (keyword?.trim()) params.keyword = keyword.trim();
      if (page) params.page = page;
      if (limit) params.limit = limit;
      const { data } = await authInstance.get("/news", { params });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
