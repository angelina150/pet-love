import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authInstance = axios.create({
  baseURL: "https://petlove.b.goit.study/api",
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});
export const setToken = (token) => {
  authInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  authInstance.defaults.headers.common.Authorization = "";
};
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (formData, thunkAPI) => {
    //   {
    // "name": "TestName",
    // "email": "test@gmail.com",
    // "password": "1234567" }
    try {
      const { data } = await authInstance.post("/users/signup", formData);
      const token = data.token;
      setToken(token);
      console.log(data, token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (formData, thunkAPI) => {
    // {
    //     "email": "across@mail.com",
    //     "password": "examplepwd12345"
    // }
    try {
      const { data } = await authInstance.post("/users/signin", formData);
      const token = data.token;
      setToken(token);
      console.log(data, token);
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

export const fetchUserFullInfo = createAsyncThunk(
  "users/fetchUserFullInfo",
  async (_, thunkAPI) => {
    try {
      const { data } = await authInstance.get("/users/current/full");

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (formData, thunkAPI) => {
    //     {
    //   "name": "TestName",
    //   "email": "test@gmail.com",
    //   "phone": "+381111111111",
    //   "avatar": "https://test.png"
    // }

    try {
      const { data } = await authInstance.patch(
        "/users/current/edit",
        formData
      );
      console.log("dataOp", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
