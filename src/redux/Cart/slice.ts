import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CartState, ICart } from './types'

import { calcCost } from '../../utils/calcCost'
import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage'

const { products, totalPrice } = getCartFromLocalStorage()

const initialState: CartState = {
	products,
	totalPrice,
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProduct(state, action: PayloadAction<ICart>) {
			const findProduct = state.products.find(
				obj => obj.id === action.payload.id
			)
			if (findProduct) {
				findProduct.count++
			} else {
				state.products.push({
					...action.payload,
					count: 1,
				})
			}
			state.totalPrice = calcCost(state.products)
		},
		removeProduct(state, action: PayloadAction<string>) {
			state.products = state.products.filter(obj => obj.id !== action.payload)
		},
		minusProduct(state, action: PayloadAction<string>) {
			const findProduct = state.products.find(obj => obj.id === action.payload)
			if (findProduct) {
				findProduct.count--
			}
			state.totalPrice = state.products.reduce((sum, obj) => {
				return obj.price * obj.count + sum
			}, 0)
		},
		clearProducts(state) {
			state.products = []
			state.totalPrice = 0
		},
	},
})

export const { addProduct, removeProduct, minusProduct, clearProducts } =
	cartSlice.actions

export default cartSlice.reducer
