import { useContext, useEffect } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import './App.css';
import AuthPage from './pages/AuthPage';
import AuthContext from './context/auth-context';
import { getExpirationTime } from './api/utils';

function App() {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if(authCtx.isLoggedIn){
      const expirationTime = getExpirationTime();

      if(expirationTime <= 0) authCtx.logout();
      else setTimeout(() => authCtx.logout(), expirationTime);
    }
  }, [authCtx]);

  const router = createBrowserRouter([
    { path: '/', element: <Navigate to='/auth' replace/> },
    { path: '/auth', element: <AuthPage /> },
    { path: '*', element: <Navigate to='/auth' replace/> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
