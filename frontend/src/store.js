import { configureStore } from "@reduxjs/toolkit";
// import accountPageReducer from './slices/accountPageSlice';
// import authReducer from './slices/authSlice';
// import cartReducer from './slices/cartSlice';
import productsReducer from "./slices/productsSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        // accountPage: accountPageReducer,
        // auth: authReducer,
        // cart: cartReducer,
        
    }
});