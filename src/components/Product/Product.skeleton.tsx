import React from 'react'
import ContentLoader from 'react-content-loader'

import styles from './Product.module.scss'

export const ProductSkeleton = () => {
	return (
		<ContentLoader
			className={styles.product}
			speed={2}
			viewBox="0 0 280 500"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb">
			<circle cx="141" cy="136" r="125" />
			<rect x="0" y="279" rx="10" ry="10" width="280" height="23" />
			<rect x="0" y="326" rx="10" ry="10" width="280" height="88" />
			<rect x="0" y="436" rx="10" ry="10" width="95" height="30" />
			<rect x="125" y="427" rx="24" ry="24" width="152" height="45" />
		</ContentLoader>
	)
}