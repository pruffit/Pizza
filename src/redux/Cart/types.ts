export interface ICart {
	id: string
	title: string
	price: number
	imageUrl: string
	type: string
	size: number
	count: number
}

export interface CartState {
	products: ICart[]
	totalPrice: number
}