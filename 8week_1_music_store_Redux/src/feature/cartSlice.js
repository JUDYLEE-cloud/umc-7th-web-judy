import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";

// 앨범 우측 수량
const initialState = {
    cartItems: cartItems.map((item) => ({
        ...item,
        amount: 0,
    })),
    total: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        // 음반 수량 증가
        increase: (state, { payload }) => {
            const itemId = payload; // 내가 클릭한 음반의 id 가져오기
            const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
            item.amount += 1;
        },
        // 음반 수량 감소
        decrease: (state, { payload }) => {
            const itemId = payload;
            const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
            item.amount -= 1;
        },
        // 음반 수량 0
        removeItem: (state, { payload }) => {
            const itemId = payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        },
        // 초기화 -> 음반 수량 모두 0
        clearCart: (state) => {
            state.cartItems = state.cartItems.map((item) => ({
                ...item,
                amount: 0,
            }));
        },
        // 하단 총 가격: sum(앨범 X 수량)
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((item) =>  {
                amount += item.amount;
                total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
        }
    }
})

export const { increase, decrease, removeItem, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
