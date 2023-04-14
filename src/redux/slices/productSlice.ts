import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProducts: any = createAsyncThunk('product/fetchProductsStatus', async (params : any) => {
	const { category, sortBy, order, search, currentPage } = params
	const { data } = await axios.get(`https://64354499537112453fd1b9bd.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
	return data 
})

export interface ProductState {
  items: any,
	status: any,
}

const initialState: ProductState = {
  items: [],
	status: 'loading', //loading | success | error
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action) {
			state.items = action.payload
		},
  },
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state, action) => {
			state.items = []
			state.status = 'loading'
		})
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.items = action.payload
			state.status = 'success'
		})
		builder.addCase(fetchProducts.rejected, (state, action) => {
			state.items = []
			state.status = 'error'
		})
	}
})

export const selectProduct = (state) => state.product

export const { setProducts } = productSlice.actions
export default productSlice.reducer