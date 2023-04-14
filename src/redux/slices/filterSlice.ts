import { createSlice } from '@reduxjs/toolkit'

export interface FilterState {
  searchValue: any,
  currentPage: number,
  categoryId: number,
  sort: {
    name: string,
    sortProperty: string,
  }
}

const initialState: FilterState = {
  searchValue: '',
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
    setSearchValue(state, action) {
      state.searchValue = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      if(Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage)
        state.categoryId = Number(action.payload.categoryId)
        state.sort = action.payload.sort
      } else {
        state.currentPage = 1
        state.categoryId = 0
        state.sort = {
          name: 'популярности (DESC)',
          sortProperty: 'rating',
        }
      }
      
    },
  },
})

export const selectSort = (state) => state.filter.sort
export const selectFilter = (state) => state.filter

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions
export default filterSlice.reducer