import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing/Landing';
import Auth from './pages/Auth/Auth';
import Payment from './pages/Payment/Payment';
import Cart from './pages/Cart/Cart';
import Orders from './pages/Orders/Orders';
import Results from './pages/Results/Results';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Stripe public key
const stripePromise = loadStripe("pk_test_51Q0sZLA7KsFf5YYB14hGAubGWk5mxCO4QCuegYhFLDMaCuA7Q1dnj9tZ7VXDdcZ2aaZQi4sRZtXyalNsOEzeEHeX00tujhBuZX");

function Routing() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />

        {/* Protected Routes */}
        <Route
          path="/payments"
          element={
            <ProtectedRoute msg="You must login to pay" redirect="/auth">
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute msg="You must login to access your orders" redirect="/auth">
              <Elements stripe={stripePromise}>
                <Orders />
              </Elements>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default Routing;
