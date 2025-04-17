import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authInstance = axios.create({
  baseURL: "https://petlove.b.goit.study",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
export const setToken = (token) => {
  authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  authInstance.defaults.headers.common.Authorization = "";
};
export const register = createAsyncThunk(
  "users/register",
  async (formData, thunkAPI) => {
    //   {
    // "name": "TestName",
    // "email": "test@gmail.com",
    // "password": "1234567" }
    try {
      const { data } = await authInstance.post("/users/signup", formData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "users/login",
  async (formData, thunkAPI) => {
    // {
    //     "email": "across@mail.com",
    //     "password": "examplepwd12345"
    // }
    try {
      const { data } = await authInstance.post("/users/signin", formData);
      const accessToken = data.data.accessToken;
      setToken(accessToken);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("users/logout", async (_, thunkAPI) => {
  try {
    const { data } = await authInstance.post("/users/signout");
    clearToken();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
