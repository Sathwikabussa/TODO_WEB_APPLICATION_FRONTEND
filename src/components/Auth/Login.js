import React, { useState } from 'react';
import { login } from '../../services/authService';
import { useNavigate, Link } from 'react-router-dom'; // Added Link for navigation
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/todos');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      <p className="auth-switch">
        New user? <Link to="/signup">Sign up here</Link>
      </p>
    </form>
  );
};

export default Login;
