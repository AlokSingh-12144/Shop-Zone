import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useCart();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
