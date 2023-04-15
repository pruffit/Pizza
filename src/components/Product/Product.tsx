import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { addProduct, ICartItem, selectCartItemById } from '../../redux/slices/cartSlice'

import styles from './Product.module.scss'

const typeNames = ['тонкое', 'традиционное']

type ProductProps = {
	id: string;
	title: string;
	imageUrl: string;
	types: number[];
	sizes: number[];
	price: number;
}

export const Product: FC<ProductProps> = ({ id, title, imageUrl, types, sizes, price }) => {
	const dispatch = useDispatch()
	const cartProduct = useSelector(selectCartItemById(id))
	const [activeSize, setActiveSize] = useState(0)
	const [activeType, setActiveType] = useState(0)

	const count = cartProduct ? cartProduct.count : 0

	const onClickAdd = () => {
		const product: ICartItem = {
			id,
			title,
			price,
			imageUrl,
			type: typeNames[activeType],
			size: sizes[activeSize],
			count: 0,
		}
		dispatch(addProduct(product))
	}

	return (
		<div className={styles.product}>
			<img
				className={styles.image}
				src={imageUrl}
				alt="Pizza"
			/>
			<Link to={`/product/${id}`}>
				<h4 className={styles.title}>{title}</h4>
			</Link>
			<div className={styles.selector}>
				<ul>
					{types.map((type, index) => (
						<li
							key={index}
							onClick={() => {setActiveType(index)}} 
							className={activeType === index ? styles.active : ''}
						>{typeNames[type]}</li>
					))}
				</ul>
				<ul>
					{sizes.map((size, index) => (
						<li
							key={index} 
							onClick={() => {setActiveSize(index)}} 
							className={activeSize === index ? styles.active : ''}
						>{size}</li>
					))}
				</ul>
			</div>
			<div className={styles.bottom}>
				<div className={styles.price}>от {price} ₽</div>
				<button 
					className="button button--outline button--add" 
					onClick={onClickAdd}
				>
					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
							fill="white"
						/>
					</svg>
					<span>Добавить</span>
					{ count > 0 &&  <i>{count}</i>}
				</button>
			</div>
		</div>
	)
}