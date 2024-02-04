import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import LoginModal from './Login/LoginModal';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={
        isAuthenticated() ? (
          <Element />
        ) : (
          <LoginModal isOpen={true} onClose={() => {}} />
        )
      }
    />
  );
};

export default PrivateRoute;
