import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/productSlice'
import filterReducer from './slices/filterSlice'
import cartReducer from './slices/cartSlice'

export const store = configureStore({
  reducer: {
		product: productReducer,
		filter: filterReducer,
		cart: cartReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch