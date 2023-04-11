import React from 'react'

import { Header } from '../../components/Header/Header'
import { Categories } from '../../components/Categories/Categories'
import { Sort } from '../../components/Sort/Sort'
import { Product } from '../../components/Product/Product'

import styles from './App.module.scss'

import data from '../../data/index.json'

export const App = () => {
  return (
    <div className={styles.wrapper}>
      <Header/>
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.top}>
            <Categories/>
            <Sort/>
          </div>
          <h2 className={styles.title}>Все пиццы</h2>
          <div className={styles.items}>
            {data.map((item, index) => (
              <Product key={index} {...item}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}