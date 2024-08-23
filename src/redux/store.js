import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import userReducer from './userSlice'
import vendorReducer from './vendorSlice'
import cartReducer from './cartSlice'
import boothReducer from './boothSlice'
import canvasReducer from './canvasSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    vendor: vendorReducer,
    cart: cartReducer,
    booth: boothReducer,
    canvas: canvasReducer,
  },
})

export default store
