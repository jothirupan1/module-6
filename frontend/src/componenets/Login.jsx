import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3001/login', {
        name,
        email,
        password
      });

      localStorage.setItem('token', res.data.token);
          localStorage.setItem('role', res.data.role);
      alert("Login Successful!");
      navigate('/home');
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      alert("Login failed. Please check your details.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
         <p className='mt-5'>If you haven't register yet pls <Link to="/Register">Register here</Link></p>
      </form>
    </div>
  );
}

export default Login;
