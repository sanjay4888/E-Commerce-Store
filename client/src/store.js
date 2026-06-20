import { configureStore } from '@reduxjs/toolkit'
import cartSliceReducer from './slices/cartSlice'
import authSliceReducer from './slices/authSlice'
import themeSliceReducer from './slices/themeSlice' // ← ADD

const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    auth: authSliceReducer,
    theme: themeSliceReducer, // ← ADD
  },
})

export default store