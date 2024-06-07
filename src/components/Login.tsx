import React, { useCallback, useEffect } from 'react';
import { Navbar } from './Navbar';
import './styles/Login.css';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import { toast } from 'react-toastify';
import { useNavigate, Navigate } from 'react-router-dom';
import { useUser } from 'UserContext';

export const Login: React.FC = ({}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleAuth = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (username.trim() === '' || password.trim() === '') {
        toast.error('Please enter both username and password.');
        return;
      }

      const storedUser = localStorage.getItem(username);

      if (isSignUp) {
        if (storedUser) {
          toast.error('User already exists. Please sign in.');
        } else {
          localStorage.setItem(username, JSON.stringify({ password, quotes: [] }));
          setUser(username);
          toast.success('Sign up successful! You are now signed in.');
          navigate('/');
        }
      } else {
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          if (userData.password === password) {
            setUser(username);
            toast.success('Sign in successful!');
            navigate('/');
          } else {
            toast.error('Incorrect password. Please try again.');
          }
        } else {
          toast.error('User does not exist. Please sign up first.');
        }
      }

      setUsername('');
      setPassword('');
    },
    [username, password]
  );

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="pt">
          <div className="Auth">
            <h2 className="form-heading">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
            <form onSubmit={handleAuth}>
              <div className="input-value ">
                <label className="input-lable"></label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-element"
                />
              </div>
              <div className="input-value ">
                <label className="input-lable"></label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-element"
                />
              </div>

              <button type="submit" className="submit-button">
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>
            <button onClick={() => setIsSignUp((prev) => !prev)} className="signup-button">
              {isSignUp ? 'Already have an account? Sign In' : 'No account? Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
