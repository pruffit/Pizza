import { createSlice } from '@reduxjs/toolkit'

export interface CartState {
  products: any,
	totalPrice: any,
}

const initialState: CartState = {
  products: [],
	totalPrice: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
		addProduct(state, action) {
			const findProduct = state.products.find(obj => obj.id === action.payload.id)
			if(findProduct) {
				findProduct.count++
			} else {
				state.products.push({
					...action.payload,
					count: 1
				})
			}
			state.totalPrice = state.products.reduce((sum : any, obj : any) => {
				return (obj.price * obj.count) + sum
			}, 0)
		},
		removeProduct(state, action) {
			state.products = state.products.filter((obj : any) => obj.id !== action.payload)
		},
		minusProduct(state, action) {
			const findProduct = state.products.find(obj => obj.id === action.payload)
			if(findProduct) {
				findProduct.count--
			}
			state.totalPrice = state.products.reduce((sum : any, obj : any) => {
				return (obj.price * obj.count) + sum
			}, 0)
		},
		clearProducts(state) {
			state.products = []
			state.totalPrice = 0
		}
  },
})

export const { addProduct, removeProduct, minusProduct, clearProducts } = cartSlice.actions
export default cartSlice.reducer