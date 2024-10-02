import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    // Redirect to the welcome page
    navigate('/');
  };

  return (
    <div>
      <h1>Employee Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
