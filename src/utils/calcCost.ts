import { ICart } from '../redux/Cart/types'

export const calcCost = (items: ICart[]) => {
	return items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
}
