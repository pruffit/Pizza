import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'

export type ICartItem = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	type: string;
	size: number;
	count: number;
}

interface CartState {
  products: ICartItem[];
	totalPrice: number;
}

const initialState: CartState = {
  products: [],
	totalPrice: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
		addProduct(state, action: PayloadAction<ICartItem>) {
			const findProduct = state.products.find(obj => obj.id === action.payload.id)
			if(findProduct) {
				findProduct.count++
			} else {
				state.products.push({
					...action.payload,
					count: 1
				})
			}
			state.totalPrice = state.products.reduce((sum, obj) => {
				return (obj.price * obj.count) + sum
			}, 0)
		},
		removeProduct(state, action: PayloadAction<string>) {
			state.products = state.products.filter((obj) => obj.id !== action.payload)
		},
		minusProduct(state, action: PayloadAction<string>) {
			const findProduct = state.products.find(obj => obj.id === action.payload)
			if(findProduct) {
				findProduct.count--
			}
			state.totalPrice = state.products.reduce((sum, obj) => {
				return (obj.price * obj.count) + sum
			}, 0)
		},
		clearProducts(state) {
			state.products = []
			state.totalPrice = 0
		}
  },
})

export const selectCart = (state: RootState) => state.cart
export const selectCartItemById = (id: string) => 
(state: RootState) => state.cart.products.find(obj => obj.id === id)

export const { addProduct, removeProduct, minusProduct, clearProducts } = cartSlice.actions
export default cartSlice.reducer