import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import cartReducer from './Cart/slice'
import filterReducer from './Filter/slice'
import productReducer from './Product/slice'

export const store = configureStore({
	reducer: {
		product: productReducer,
		filter: filterReducer,
		cart: cartReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
