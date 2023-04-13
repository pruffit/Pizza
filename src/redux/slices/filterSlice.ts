import { createSlice } from '@reduxjs/toolkit'

export interface FilterState {
  currentPage: number,
  categoryId: Number,
  sort: {
    name: String,
    sortProperty: String,
  }
}

const initialState: FilterState = {
  currentPage: 1,
  categoryId: 0,
  sort: {
    name: 'популярности (DESC)',
    sortProperty: 'rating',
  }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage)
      state.categoryId = Number(action.payload.categoryId)
      state.sort = action.payload.sort
    },
  },
})

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions
export default filterSlice.reducer