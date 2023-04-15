import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchProducts } from './asyncActions'

import { IProduct, ProductState, Status } from './types'

const initialState: ProductState = {
	items: [],
	status: Status.LOADING,
}

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setProducts(state, action: PayloadAction<IProduct[]>) {
			state.items = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchProducts.pending, state => {
			state.items = []
			state.status = Status.LOADING
		})
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.items = action.payload
			state.status = Status.SUCCESS
		})
		builder.addCase(fetchProducts.rejected, state => {
			state.items = []
			state.status = Status.ERROR
		})
	},
})

export const { setProducts } = productSlice.actions
export default productSlice.reducer