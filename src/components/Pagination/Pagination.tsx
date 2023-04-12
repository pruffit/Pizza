import React from 'react'
import ReactPaginate from 'react-paginate'

import { IPagination } from './Pagination.props'

import styles from './Pagination.module.scss'

export const Pagination = ({ currentPage, onChangePage } : IPagination) => {
	return (
		<ReactPaginate
			className={styles.pagination}
			breakLabel="..."
			nextLabel=">"
			previousLabel="<"
			onPageChange={(event) => onChangePage(event.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			forcePage={currentPage - 1}
  	/>
	)
}