// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductCrud from './components/ProductCrud';
import PrivateRoute from './components/PrivateRoute';
import 'firebase/auth';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <PrivateRoute path="/product-crud" element={<ProductCrud />} />
        <Route path="/" element={<ProductList />} />
      </Routes>
    </Router>
  );
};

export default App;
