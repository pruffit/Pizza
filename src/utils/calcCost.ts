import { ICartItem } from '../redux/Cart/cartSlice'

export const calcCost = (items: ICartItem[]) => {
	return items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
}
