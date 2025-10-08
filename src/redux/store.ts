import { configureStore } from "@reduxjs/toolkit";
//import productReducer from "./productSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    //products: productReducer,
    cart: cartReducer,
  },
});

export default store;

// ✅ Add these exports for typing
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
