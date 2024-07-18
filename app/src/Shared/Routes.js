
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Skeleton from './Skeleton';
import ProductList from '../Products/ProductList'
import ProductDetail from '../Products/ProductDetail';


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={
          <Skeleton>
            <ProductList/>
          </Skeleton>
          } />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;