import { promiseReducer } from "./promiseReduser";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { localStoredReducer } from "./localStoredReduser";
import { authReducer } from "./authReducer";
import { cartReducer } from "./cartReduser";
const reducer = combineReducers({
  basket: localStoredReducer(cartReducer, "basket"),
  query: promiseReducer,
  auth: localStoredReducer(authReducer, "auth"),
});

const store = configureStore({ reducer });
export default store;
