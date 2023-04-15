import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type ISort = {
  name: string;
  sortProperty: SortPropertyEnum;
}

export interface FilterState {
  searchValue: string;
  currentPage: number;
  categoryId: number;
  sort: ISort;
}

const initialState: FilterState = {
  searchValue: '',
  currentPage: 1,
  categoryId: 0,
  sort: {
    name: 'популярности (DESC)',
    sortProperty: SortPropertyEnum.RATING_DESC,
  }
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
      if(Object.keys(action.payload).length) {
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

export const selectSort = (state: RootState) => state.filter.sort
export const selectFilter = (state: RootState) => state.filter

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions
export default filterSlice.reducer