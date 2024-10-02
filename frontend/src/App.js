import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';
import Welcome from './components/Welcome';

// Protected Route Component
const ProtectedRoute = ({ element, role }) => {
  const token = localStorage.getItem('token');
  
  // If the token is present, allow access, otherwise redirect to welcome page
  return token ? element : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
