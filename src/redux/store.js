import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { usersReducer } from "./users/slice.js";
import { friendsReducer } from "./friends/slice.js";
import { newsReducer } from "./news/slice.js";
import { citiesReducer } from "./cities/slice.js";
import { noticesReducer } from "./notices/slice.js";

const usersConfig = {
  key: "users",
  storage,
  whitelist: ["token"],
};

const rootReducer = combineReducers({
  notices: noticesReducer,
  cities: citiesReducer,
  news: newsReducer,
  friends: friendsReducer,
  users: persistReducer(usersConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
