import { FC, lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { MainLayout } from '../../layouts/MainLayout/MainLayout'

// import { Home } from '../../pages/Home/Home'
// import { ProductPage } from '../../pages/ProductPage/ProductPage'
// import { Cart } from '../../pages/Cart/Cart'
// import { NotFound } from '../../pages/NotFound/NotFound'

const Home = lazy(() => import('../../pages/Home/Home'))
const ProductPage = lazy(() => import('../../pages/ProductPage/ProductPage'))
const Cart = lazy(() => import('../../pages/Cart/Cart'))
const NotFound = lazy(() => import('../../pages/NotFound/NotFound'))

export const App: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={
          <Suspense fallback={
            <div className='loading-fallback'>Идет загрузка страницы...</div>
          }>
            <Home/>
          </Suspense>
        }/>
        <Route path='product/:id' element={
          <Suspense fallback={
            <div className='loading-fallback'>Идет загрузка страницы...</div>
          }>
            <ProductPage/>
          </Suspense>
        }/>
        <Route path='cart' element={
          <Suspense fallback={
            <div className='loading-fallback'>Идет загрузка страницы...</div>
          }>
            <Cart/>
          </Suspense>
        }/>
        <Route path='*' element={
          <Suspense fallback={
            <div className='loading-fallback'>Идет загрузка страницы...</div>
          }>
            <NotFound/>
          </Suspense>
        }/>
      </Route>
    </Routes>
  )
}