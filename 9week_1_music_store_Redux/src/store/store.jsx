// 중앙 저장소 (모든 slice 모으기)

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../feature/cartSlice';
import modalReducer from '../feature/modalSlice';

const store = configureStore({
    reducer: {
      cart: cartReducer,
      modal: modalReducer,
    },
  });
  
  export default store;