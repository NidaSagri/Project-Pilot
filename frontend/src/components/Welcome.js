import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css'; 

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>Welcome to Project Pilot!</h1>
      <p>Please login or signup to proceed:</p>
      <div className="button-container">
        <button onClick={() => navigate('/login')} className="welcome-btn">Login</button>
        <button onClick={() => navigate('/signup')} className="welcome-btn">Signup</button>
      </div>
    </div>
  );
};

export default Welcome;
