import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { IProduct, ISearchProduct } from './types'

export const fetchProducts = createAsyncThunk<IProduct[], ISearchProduct>(
	'product/fetchProductsStatus',
	async params => {
		const { category, sortBy, order, search, currentPage } = params
		const { data } = await axios.get<IProduct[]>(
			`https://64354499537112453fd1b9bd.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		)
		return data
	}
)