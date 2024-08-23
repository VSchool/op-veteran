// fake data

import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addItemToCart(state, action) {
      state.cartItems.push(action.payload)
    },
    removeItemFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      )
    },
  },
})

export const { addItemToCart, removeItemFromCart } = cartSlice.actions

export default cartSlice.reducer
