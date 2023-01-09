import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './page/Home';
import AllProducts from './page/AllProducts';
import NewProduct from './page/NewProduct';
import ProductDetail from './page/ProductDetail';
import MyCart from './page/MyCart';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/new' element={<NewProduct />} />
          <Route path='/products/:id' element={<ProductDetail />} />
          <Route path='/carts' element={<MyCart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
