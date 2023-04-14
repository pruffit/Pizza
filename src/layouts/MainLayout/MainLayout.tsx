import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header/Header'

import styles from './MainLayout.module.scss'

export const MainLayout: FC = () => {
	return (
		<div className={styles.wrapper}>
      <Header/>
      <div className={styles.content}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </div>
    </div>
	)
}