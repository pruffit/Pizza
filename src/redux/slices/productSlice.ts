import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { RootState } from '../store'

type Product = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	size: number[];
	types: number[];
	rating: number;
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export type SearchProductParams = {
	category: string; 
	sortBy: string; 
	order: string;
	search: string;
	currentPage: string;
}

export interface ProductState {
  items: Product[];
	status: Status.LOADING | Status.SUCCESS | Status.ERROR;
}

const initialState: ProductState = {
  items: [],
	status: Status.LOADING,
}

export const fetchProducts = createAsyncThunk<Product[], SearchProductParams>('product/fetchProductsStatus', async (params) => {
	const { category, sortBy, order, search, currentPage } = params
	const { data } = await axios.get<Product[]>(`https://64354499537112453fd1b9bd.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
	console.log(`https://64354499537112453fd1b9bd.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
	return data
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
			state.items = action.payload
		},
  },
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state) => {
			state.items = []
			state.status = Status.LOADING
		})
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.items = action.payload
			state.status = Status.SUCCESS
		})
		builder.addCase(fetchProducts.rejected, (state) => {
			state.items = []
			state.status = Status.ERROR
		})
	}
})

export const selectProduct = (state: RootState) => state.product

export const { setProducts } = productSlice.actions
export default productSlice.reducer