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
	const [categoryId, setCategoryId] = useState(0)
	const [value, setValue] = useState({
		name: 'популярности',
		sort: 'rating'
	})

  useEffect(() => {
		setIsLoading(true)
    fetch(`https://64354499537112453fd1b9bd.mockapi.io/items?${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${value.sort.replace('-', '')}&order=${value.sort.includes('-') ? 'asc' : 'desc'}`)
    .then((res) => res.json())
    .then((json) => setItems(json))
    .then(() => setIsLoading(false))
		window.scrollTo(0, 0)
  }, [categoryId, value])

	return (
		<>
			<div className={styles.top}>
				<Categories 
					categoryId={categoryId}
					onClickCategory={(index : any) => setCategoryId(index)}
				/>
				<Sort
					value={value}
					onClickSort={(index : any) => setValue(index)}
				/>
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