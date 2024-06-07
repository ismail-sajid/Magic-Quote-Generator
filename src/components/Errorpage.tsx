import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import './styles/Errorpage.css';

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div className="error-page">
        <h1 className="error-heading">404 - Page Not Found</h1>
        <p>The page you are looking for does not exist or you do not have access to it.</p>
        <button onClick={redirectToHome} className="button-81">
          Go to Homepage
        </button>
      </div>
    </>
  );
};
