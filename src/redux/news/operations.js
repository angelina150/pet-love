import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authInstance = axios.create({
  baseURL: "https://petlove.b.goit.study/api",
  headers: { "Content-Type": "application/json" },
});

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (formData, thunkAPI) => {
    //   {
    // "keyword": "TestName",
    // "page": "1",
    // "limit": "6" }
    try {
      const { data } = await authInstance.get("/news", formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
