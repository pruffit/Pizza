import { FC } from 'react'

import styles from './Categories.module.scss'

type CategoriesProps = {
	categoryId: number;
	onClickCategory: (index: number) => void;
}

export const Categories: FC<CategoriesProps> = ({ categoryId, onClickCategory }) => {
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