import { create } from "zustand";
import cartItems from "../constants/cartItems"; 

export const useCartStore = create((set, get) => ({
  cartItems: cartItems.map((item) => ({
    ...item,
    amount: 0,
  })),
  total: 0, // 총 가격
  amount: 0, // 총 수량

  // 아이템 추가
  addItem: (item) => {
    const existingItem = get().cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      set({
        cartItems: get().cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, amount: cartItem.amount + 1 }
            : cartItem
        ),
      });
    } else {
      set({
        cartItems: [...get().cartItems, { ...item, amount: 1 }],
      });
    }
    get().calculateTotals();
  },

  // 아이템 수량 증가
  increase: (id) => {
    set({
      cartItems: get().cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      ),
    });
    get().calculateTotals();
  },

  // 아이템 수량 감소
  decrease: (id) => {
    set({
      cartItems: get().cartItems
        .map((item) =>
          item.id === id && item.amount > 1
            ? { ...item, amount: item.amount - 1 }
            : item
        )
        .filter((item) => item.amount > 0), // 수량이 0이면 제거
    });
    get().calculateTotals();
  },

  // 장바구니 비우기
  clearCart: () => {
    set({ 
      cartItems: get().cartItems.map((item) => ({
        ...item,
        amount: 0,
      })),
     });
    get().calculateTotals();
  },

  // 총 수량 및 총 가격 계산
  calculateTotals: () => {
    const { cartItems } = get();
    const total = cartItems.reduce((acc, item) => acc + item.amount * item.price, 0);
    const amount = cartItems.reduce((acc, item) => acc + item.amount, 0);

    set({ total, amount });
  },
}));
