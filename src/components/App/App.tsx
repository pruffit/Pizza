import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { MainLayout } from '../../layouts/MainLayout/MainLayout'

import { Home } from '../../pages/Home/Home'
import { ProductPage } from '../../pages/ProductPage/ProductPage'
import { Cart } from '../../pages/Cart/Cart'
import { NotFound } from '../../pages/NotFound/NotFound'

export const App: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />}/>
        <Route path='product/:id' element={<ProductPage />}/>
        <Route path='cart' element={<Cart />}/>
        <Route path='*' element={<NotFound />}/>
      </Route>
    </Routes>
  )
}