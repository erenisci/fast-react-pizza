import { createSlice } from '@reduxjs/toolkit';

const initialStateCart = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialStateCart,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find(item => item.pizzaId === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find(item => item.pizzaId === action.payload);
      if (item) {
        item.quantity--;
        if (item.quantity === 0) {
          state.cart = state.cart.filter(cartItem => cartItem.pizzaId !== action.payload);
        } else {
          item.totalPrice = item.quantity * item.unitPrice;
        }
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const getCart = state => state.cart.cart;

export const getCurrentQuantityById = id => state =>
  state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0;

export const getTotalCartQuantity = state =>
  state.cart.cart.reduce((acc, cur) => acc + cur.quantity, 0);

export const getTotalCartPrice = state =>
  state.cart.cart.reduce((acc, cur) => acc + cur.totalPrice, 0);
