import { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { setCategoryId, setCurrentPage } from '../../redux/slices/filterSlice'

import { IProduct } from '../../components/Product/Product.props'

import { SearchContext } from '../../components/App/App'

import { Categories } from '../../components/Categories/Categories'
import { Sort } from '../../components/Sort/Sort'
import { Product } from '../../components/Product/Product'
import { ProductSkeleton } from '../../components/Product/Product.skeleton'
import { Pagination } from '../../components/Pagination/Pagination'

import styles from './Home.module.scss'

export const Home = () => {
	const dispatch = useDispatch()
	const { categoryId, sort, currentPage } = useSelector(state => state.filter)

	const { searchValue } = useContext(SearchContext)
	const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

	const onClickCategory = (id : Number) => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = (number: Number) => {
		dispatch(setCurrentPage(number))
	}

  useEffect(() => {
		setIsLoading(true)

		axios.get(`https://64354499537112453fd1b9bd.mockapi.io/items?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sort.sortProperty.replace('-', '')}&order=${sort.sortProperty.includes('-') ? 'asc' : 'desc'}${searchValue ? `&search=${searchValue}` : ''}`)
		.then(res => {
			setItems(res.data)
			setIsLoading(false)
		})
		
		window.scrollTo(0, 0)
  }, [categoryId, sort, searchValue, currentPage])

	return (
		<>
			<div className={styles.top}>
				<Categories 
					categoryId={categoryId}
					onClickCategory={onClickCategory}
				/>
				<Sort />
			</div>
			<h2 className={styles.title}>Все пиццы</h2>
			<div className={styles.items}>
				{
					isLoading ? 
					[...new Array(8)].map((_, index) => <ProductSkeleton key={index}/>) :
					items.map((item : IProduct, index) => <Product key={index} {...item}/>)
				}
			</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage}/>
		</>
	)
}