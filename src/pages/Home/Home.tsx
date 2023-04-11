import { useState, useEffect } from 'react'

import { IProduct } from '../../components/Product/Product.props'

import { Categories } from '../../components/Categories/Categories'
import { Sort } from '../../components/Sort/Sort'
import { Product } from '../../components/Product/Product'
import { ProductSkeleton } from '../../components/Product/Product.skeleton'

import styles from './Home.module.scss'

export const Home = () => {
	const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://64354499537112453fd1b9bd.mockapi.io/items')
    .then((res) => res.json())
    .then((json) => setItems(json))
    .then(() => setIsLoading(false))
		window.scrollTo(0, 0)
  }, [])

	return (
		<>
			<div className={styles.top}>
				<Categories/>
				<Sort/>
			</div>
			<h2 className={styles.title}>Все пиццы</h2>
			<div className={styles.items}>
				{
					isLoading ? 
					[...new Array(8)].map((_, index) => <ProductSkeleton key={index}/>) :
					items.map((item : IProduct, index) => <Product key={index} {...item}/>)
				}
			</div>
		</>
	)
}