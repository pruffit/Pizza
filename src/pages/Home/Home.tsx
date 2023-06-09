import { FC, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '../../redux/store'

import { selectFilter } from '../../redux/Filter/selectors'
import { setCategoryId, setCurrentPage } from '../../redux/Filter/slice'

import { selectProduct } from '../../redux/Product/selectors'
import { fetchProducts } from '../../redux/Product/asyncActions'

import { Categories } from '../../components/Categories/Categories'
import { Pagination } from '../../components/Pagination/Pagination'
import { Product } from '../../components/Product/Product'
import { ProductSkeleton } from '../../components/Product/Product.skeleton'
import { Sort } from '../../components/Sort/Sort'

import styles from './Home.module.scss'

const Home: FC = () => {
	const dispatch = useAppDispatch()

	const { items, status } = useSelector(selectProduct)
	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectFilter)

	const onChangeCategory = useCallback((index: number) => {
		dispatch(setCategoryId(index))
	}, [])

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page))
	}

	const getProducts = async () => {
		const sortBy = sort.sortProperty.replace('-', '')
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const category = categoryId > 0 ? `category=${String(categoryId)}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		dispatch(
			fetchProducts({
				sortBy,
				order,
				category,
				search,
				currentPage: String(currentPage),
			})
		)
		window.scrollTo(0, 0)
	}

	useEffect(() => {
		getProducts()
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	const products = items.map((obj: any) => <Product key={obj.id} {...obj} />)
	const skeletons = [...new Array(4)].map((_, index) => (
		<ProductSkeleton key={index} />
	))

	return (
		<>
			<div className={styles.top}>
				<Categories
					categoryId={categoryId}
					onClickCategory={onChangeCategory}
				/>
				<Sort value={sort} />
			</div>
			<h2 className={styles.title}>Все пиццы</h2>
			{status === 'error' ? (
				<div className={styles.error}>
					<h2>Произошла ошибка 😕</h2>
					<p>
						<span>Ah shit, here we go again.</span>
						<br /> Попробуйте повторить попытку позже.
					</p>
				</div>
			) : (
				<div className={styles.items}>
					{status === 'loading' ? skeletons : products}
				</div>
			)}
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</>
	)
}
export default Home