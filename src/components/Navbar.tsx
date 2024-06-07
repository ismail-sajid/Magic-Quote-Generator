import React, { useCallback, useState } from 'react';
import './styles/Navbar.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'UserContext';

export const Navbar: React.FC = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleAuthButtonClick = useCallback(() => {
    if (user) {
      toast.success('Logged Out Successfully!');
      setUser(null);
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [user, navigate, setUser]);

  return (
    <>
      <nav className="navbar-container">
        <button className="button-81" onClick={() => navigate('/')}>
          HomePage
        </button>
        <button className="button-81" onClick={handleAuthButtonClick}>
          {user ? 'Logout' : 'Signin'}
        </button>
      </nav>
    </>
  );
};
