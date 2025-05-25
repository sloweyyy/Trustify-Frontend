import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// This route component allows access to verification page regardless of authentication status
// It doesn't redirect users based on roles - all users can access the verify page
const VerifyRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  // Log for debugging
  console.log('VerifyRoute - isAuthenticated:', isAuthenticated);
  console.log('VerifyRoute - location:', location.pathname);

  // Simply render the child route without any redirects
  return <Outlet />;
};

export default VerifyRoute;
