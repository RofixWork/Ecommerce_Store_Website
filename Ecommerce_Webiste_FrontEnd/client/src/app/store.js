import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import authApi from "../api/authAPI";
import categoryAPI from "../api/categoryAPI";
import productAPI from "../api/productAPI";
import paymentAPI from "../api/paymentAPI";
import orderAPI from "../api/orderAPI";
import userOrderAPI from "../api/userOrderAPI";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoryAPI.reducerPath]: categoryAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [paymentAPI.reducerPath]: paymentAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
    [userOrderAPI.reducerPath]: userOrderAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(categoryAPI.middleware)
      .concat(productAPI.middleware)
      .concat(paymentAPI.middleware)
      .concat(orderAPI.middleware)
      .concat(userOrderAPI.middleware),
});
