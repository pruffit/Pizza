export interface IProduct {
	id: string
	title: string
	price: number
	imageUrl: string
	size: number[]
	types: number[]
	rating: number
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export interface ISearchProduct {
	category: string
	sortBy: string
	order: string
	search: string
	currentPage: string
}

export interface ProductState {
	items: IProduct[]
	status: Status.LOADING | Status.SUCCESS | Status.ERROR
}