// import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authInstance } from "../users/operations.js";

// export const authInstance = axios.create({
//   baseURL: "https://petlove.b.goit.study/api",
//   headers: { "Content-Type": "application/json" },
// });

export const fetchNotices = createAsyncThunk(
  "notices/fetchNotices",
  async (filters, thunkAPI) => {
    try {
      const params = {};
      if (filters.keyword) params.keyword = filters.keyword;
      if (filters.category) params.category = filters.category;
      if (filters.species) params.species = filters.species;
      if (filters.locationId) params.locationId = filters.locationId;
      if (filters.sex) params.sex = filters.sex;
      if (filters.byDate !== undefined) params.byDate = filters.byDate;
      if (filters.byPrice !== undefined) params.byPrice = filters.byPrice;
      if (filters.byPopularity !== undefined)
        params.byPopularity = filters.byPopularity;
      if (filters.page) params.page = filters.page;
      if (filters.limit) params.limit = filters.limit;
      const { data } = await authInstance.get("/notices", {
        params,
      });
      return data;
    } catch (error) {
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
export const fetchNoticesSex = createAsyncThunk(
  "notices/fetchNoticesSex",
  async (_, thunkAPI) => {
    try {
      const { data } = await authInstance.get("/notices/sex");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchNoticesSpecies = createAsyncThunk(
  "notices/fetchNoticesSpecies",
  async (_, thunkAPI) => {
    try {
      const { data } = await authInstance.get("/notices/species");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addFavoritesNotices = createAsyncThunk(
  "notices/addFavoritesNotices",
  async (id, thunkAPI) => {
    try {
      const { data } = await authInstance.post(`/notices/favorites/add/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const removeFavoritesNoticesById = createAsyncThunk(
  "notices/removeFavoritesNoticesById",
  async (id, thunkAPI) => {
    try {
      const { data } = await authInstance.delete(
        `/notices/favorites/remove/${id}`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
