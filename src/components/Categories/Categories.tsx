import React from 'react'

import { ICategory } from './Category.props'

import styles from './Categories.module.scss'

export const Categories = ({ categoryId, onClickCategory } : ICategory) => {
	const categories = ['Все','Мясные','Вегетарианские','Гриль','Острые','Закрытые']

	return (
		<div className={styles.categories}>
			<ul>
				{categories.map((category, index) => (
					<li
						key={index}
						onClick={() => {onClickCategory(index)}} 
						className={categoryId === index ? styles.active : ''}
					>{category}</li>
				))}
			</ul>
		</div>
	)
}