import React from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from './AuthContext';
import Login from './Login/Login';

const Protected = ({ children }) => {
  const { isAuthenticated, isLoggedIn } = useAuth();
  // console.log(`Protected: ${isAuthenticated}`);
  // console.log(`isLoggedIn: ${isLoggedIn}`);
  // const { isAuthenticated } = false;

  // return isAuthenticated ? children : <Login />;
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default Protected;
