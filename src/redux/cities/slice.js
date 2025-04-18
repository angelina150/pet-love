import { createSlice } from "@reduxjs/toolkit";
import { fetchCities, fetchCitiesLocations } from "./operations.js";

const initialState = {
  data: {},
  error: null,
  loading: false,
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCitiesLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCitiesLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.locatios = action.payload;
      })
      .addCase(fetchCitiesLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const citiesReducer = citiesSlice.reducer;
