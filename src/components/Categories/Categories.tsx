import React from 'react'

import styles from './Categories.module.scss'

export const Categories = () => {
	return (
		<div className={styles.categories}>
			<ul>
				<li className={styles.active}>Все</li>
				<li>Мясные</li>
				<li>Вегетарианская</li>
				<li>Гриль</li>
				<li>Острые</li>
				<li>Закрытые</li>
			</ul>
		</div>
	)
}