import { FC, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import styles from './ProductPage.module.scss'

const ProductPage: FC = () => {
	const [product, setProduct] = useState<{
		imageUrl: string,
		title: string,
		description: string,
		price: number,
	}>()
	const { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		async function fetchProduct() {
			try {
				const { data } = await axios.get(`https://64354499537112453fd1b9bd.mockapi.io/items/${id}`)
				setProduct(data)
			} catch (error) {
				alert('Произошла ошибка при получении пиццы!')
				navigate('/')
			}
		}
		fetchProduct()
	}, [])

	if(!product) {
		return <div className='loading-fallback'>Загрузка...</div>
	} else {
		return (
			<div className={styles.product}>
				<h1>{product.title}</h1>
				<img src={product.imageUrl} alt='pizza'/>
				<p>{product.description}</p>
				<div>от {product.price} ₽</div>
			</div>
		)
	}
}
export default ProductPage