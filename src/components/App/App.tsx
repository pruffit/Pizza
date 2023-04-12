import { createContext, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Header } from '../../components/Header/Header'

import { Home } from '../../pages/Home/Home'
import { NotFound } from '../../pages/NotFound/NotFound'
import { Cart } from '../../pages/Cart/Cart'

import styles from './App.module.scss'

export const SearchContext = createContext()

export const App = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className={styles.wrapper}>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header/>
        <div className={styles.content}>
          <div className={styles.container}>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='*' element={<NotFound/>}/>
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  )
}