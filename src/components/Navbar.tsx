import React, { useCallback } from 'react';
import './styles/Navbar.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'UserContext';

export const Navbar: React.FC = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const handleLogout = useCallback(() => {
    toast.success('Logged Out Successfully!');
    setUser(null);
    navigate('/');
  }, []);

  return (
    <>
      <nav className="navbar-container">
        <button className="button-81" onClick={() => navigate('/')}>
          HomePage
        </button>
        <button className="button-81" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </>
  );
};
