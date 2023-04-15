import { calcCost } from './calcCost'

export const getCartFromLocalStorage = () => {
	const data = localStorage.getItem('cart')
	const products = data ? JSON.parse(data) : []
	const totalPrice = calcCost(products)

	return {
		products,
		totalPrice,
	}
}