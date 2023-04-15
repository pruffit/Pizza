export interface ISort {
	name: string
	sortProperty: SortPropertyEnum
}

export interface FilterState {
	searchValue: string
	currentPage: number
	categoryId: number
	sort: ISort
}

export enum SortPropertyEnum {
	RATING_DESC = 'rating',
	RATING_ASC = '-rating',
	TITLE_DESC = 'title',
	TITLE_ASC = '-title',
	PRICE_DESC = 'price',
	PRICE_ASC = '-price',
}