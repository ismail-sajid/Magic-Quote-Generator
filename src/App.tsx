import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QuoteApp } from 'QuoteApp';
import { Login } from 'components/Login';
import { UserProvider } from 'UserContext';
import { ErrorPage } from 'components/Errorpage';

const App: React.FC = () => {
  const router = createBrowserRouter([
    { path: '/', element: <QuoteApp /> },
    { path: '/login', element: <Login /> },
    { path: '*', element: <ErrorPage /> },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default App;
