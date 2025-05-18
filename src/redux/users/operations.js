import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authInstance = axios.create({
  baseURL: "https://petlove.b.goit.study/api",
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
    try {
      const { data } = await authInstance.post("/users/signup", formData);
      const token = data.token;
      localStorage.setItem("token", token);
      setToken(token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (formData, thunkAPI) => {
    try {
      const { data } = await authInstance.post("/users/signin", formData);
      const token = data.token;
      localStorage.setItem("token", token);
      setToken(token);
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

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (formData, thunkAPI) => {
    try {
      const { data } = await authInstance.patch(
        "/users/current/edit",
        formData
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserInfo = createAsyncThunk(
  "users/fetchUserInfo",
  async (_, thunkAPI) => {
    try {
      const { data } = await authInstance.get("/users/current");

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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

export const addPets = createAsyncThunk(
  "users/addPets",
  async (formData, thunkAPI) => {
    try {
      const { data } = await authInstance.post(
        "/users/current/pets/add",
        formData
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const removePet = createAsyncThunk(
  "users/removePet",
  async (id, thunkAPI) => {
    try {
      const { data } = await authInstance.delete(
        `users/current/pets/remove/${id}`,
        {
          params: { id },
        }
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
