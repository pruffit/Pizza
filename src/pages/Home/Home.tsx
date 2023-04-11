import { useState, useEffect } from 'react'

import { IHome } from './Home.props'
import { IProduct } from '../../components/Product/Product.props'

import { Categories } from '../../components/Categories/Categories'
import { Sort } from '../../components/Sort/Sort'
import { Product } from '../../components/Product/Product'
import { ProductSkeleton } from '../../components/Product/Product.skeleton'
import { Pagination } from '../../components/Pagination/Pagination'

import styles from './Home.module.scss'

export const Home = ({ searchValue, setSearchValue } : IHome) => {
	const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
	const [categoryId, setCategoryId] = useState(0)
	const [currentPage, setCurrentPage] = useState(1)
	const [sortType, setValue] = useState({
		name: 'популярности',
		sort: 'rating'
	})

  useEffect(() => {
		setIsLoading(true)
    fetch(`https://64354499537112453fd1b9bd.mockapi.io/items?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortType.sort.replace('-', '')}&order=${sortType.sort.includes('-') ? 'asc' : 'desc'}${searchValue ? `&search=${searchValue}` : ''}`)
    .then((res) => res.json())
    .then((json) => setItems(json))
    .then(() => setIsLoading(false))
		window.scrollTo(0, 0)
  }, [categoryId, sortType, searchValue, currentPage])

	return (
		<>
			<div className={styles.top}>
				<Categories 
					categoryId={categoryId}
					onClickCategory={(index : any) => setCategoryId(index)}
				/>
				<Sort
					sortType={sortType}
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
			<Pagination onChangePage={number => setCurrentPage(number)}/>
		</>
	)
}