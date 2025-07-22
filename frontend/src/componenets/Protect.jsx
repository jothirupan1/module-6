import React from 'react';
import { Navigate } from 'react-router-dom';

function Protect({ children, role: requiredRole }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); 


  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If role is required and it doesn't match, redirect to home
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/home" replace />;
  }

  // If everything is okay, show the component
  return children;
}

export default Protect;
