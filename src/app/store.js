import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";
import loaderReducer from "../reducers/loaderSlice";
import successMessageSlice from "../reducers/successMessageSlice";
import networkStatusSlice from "../reducers/networkStatusSlice";
import transactionsReducer from "../reducers/transactionsSlice";
import rulesReducer from "../reducers/rulesSlice";
import customersReducer from "../reducers/customersSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["loader", "transactions", "rules", "customers"],
};

const rootReducer = combineReducers({
  user: userReducer,
  loader: loaderReducer,
  success: successMessageSlice,
  networkStatus: networkStatusSlice,
  transactions: transactionsReducer,
  rules: rulesReducer,
  customers: customersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
