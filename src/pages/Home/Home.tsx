import { useState, useEffect, useContext, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import { fetchProducts, selectProduct } from '../../redux/slices/productSlice'
import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../../redux/slices/filterSlice'

import { IProduct } from '../../components/Product/Product.props'

import { SearchContext } from '../../components/App/App'

import { Categories } from '../../components/Categories/Categories'
import { Sort, sortList } from '../../components/Sort/Sort'
import { Product } from '../../components/Product/Product'
import { ProductSkeleton } from '../../components/Product/Product.skeleton'
import { Pagination } from '../../components/Pagination/Pagination'

import styles from './Home.module.scss'

export const Home = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isSearch = useRef(false)
	const isMounted = useRef(false)

	const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)
	const { items, status } = useSelector(selectProduct)

	const onClickCategory = (id : Number) => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = (number: Number) => {
		dispatch(setCurrentPage(number))
	}

	const getProducts = async () => {
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const sortBy = sort.sortProperty.replace('-', '')
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const search = searchValue ? `&search=${searchValue}` : ''

		dispatch(fetchProducts({
				category,
				sortBy,
				order,
				search,
				currentPage,
			}),
		)
		window.scrollTo(0, 0)
	}

	useEffect(() => {
		if(window.location.search) {
			const params = qs.parse(window.location.search.substring(1))
			const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
			dispatch(
				setFilters({
					...params, 
					sort,
				})
			)
			isSearch.current = true
		}
	}, [])

  useEffect(() => {
		window.scrollTo(0, 0)

			getProducts()

		isSearch.current = false
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

	useEffect(() => {
		if(isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			})
			navigate(`?${queryString}`)
		}
		isMounted.current = true
	}, [categoryId, sort.sortProperty, currentPage])

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
			{
				status === 'error' ? (
					<div className={styles.error}>
						<h2>Произошла ошибка 😕</h2>
						<p><span>Ah shit, here we go again.</span><br/> Попробуйте повторить попытку позже.</p>
					</div>
				) : (
					<div className={styles.items}>
						{
							status === 'loading' ? 
							[...new Array(4)].map((_, index) => <ProductSkeleton key={index}/>) :
							items.map((item : IProduct, index) => <Product key={index} {...item}/>)
						}
					</div>
				)
			}
			<Pagination currentPage={currentPage} onChangePage={onChangePage}/>
		</>
	)
}