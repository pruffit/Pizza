import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FilterState, ISort, SortPropertyEnum } from './types'

const initialState: FilterState = {
	searchValue: '',
	currentPage: 1,
	categoryId: 0,
	sort: {
		name: 'популярности (DESC)',
		sortProperty: SortPropertyEnum.RATING_DESC,
	},
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload
		},
		setSort(state, action: PayloadAction<ISort>) {
			state.sort = action.payload
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setFilters(state, action: PayloadAction<FilterState>) {
			if (Object.keys(action.payload).length) {
				state.currentPage = Number(action.payload.currentPage)
				state.categoryId = Number(action.payload.categoryId)
				state.sort = action.payload.sort
			} else {
				state.currentPage = 1
				state.categoryId = 0
				state.sort = {
					name: 'популярности (DESC)',
					sortProperty: SortPropertyEnum.RATING_DESC,
				}
			}
		},
	},
})

export const {
	setCategoryId,
	setSort,
	setCurrentPage,
	setFilters,
	setSearchValue,
} = filterSlice.actions
export default filterSlice.reducer