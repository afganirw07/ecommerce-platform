import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPages from './pages/landingPages';
import LoginUser from './components/LoginAndRegist/LoginUser';
import RegisterUser from './components/LoginAndRegist/RegisterUser';
import Home from './pages/home';
import ProtectedRoute from './components/ProtectedRoute';
import DetailProducts from './pages/detailProducts';
import NotFound from './pages/notFound';
import Cart from './pages/cart';
import Wishlist from './pages/wishlist';
import './index.css';
import Pembayaran from './pages/pembayaran';
import Confirmations from './pages/afterPay';
import SearchPage from './pages/searchPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPages />} />
      <Route path="/login" element={<LoginUser />} />
      <Route path="/register" element={<RegisterUser />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/product/:id" element={<DetailProducts />} />

      {/* protect */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
      path='/favorite'
      element= {
        <ProtectedRoute>
          <Wishlist />
        </ProtectedRoute>
      }
      />

      <Route
      path='/payment'
      element={
        <ProtectedRoute>
          <Pembayaran />
        </ProtectedRoute>
      }/>
      <Route
      path='/confirmations'
      element={
        <ProtectedRoute>
          <Confirmations />
        </ProtectedRoute>
      }/>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
