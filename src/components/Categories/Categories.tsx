import {useState} from 'react'

import styles from './Categories.module.scss'

export const Categories = () => {
	const categories = ['Все','Мясные','Вегетарианские','Гриль','Острые','Закрытые']
	const [activeCategory, setActiveCategory] = useState(0)

	return (
		<div className={styles.categories}>
			<ul>
				{categories.map((category, index) => (
					<li
						key={index}
						onClick={() => {setActiveCategory(index)}} 
						className={activeCategory === index ? styles.active : ''}
					>{category}</li>
				))}
			</ul>
		</div>
	)
}