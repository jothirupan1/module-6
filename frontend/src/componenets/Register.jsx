import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom';
import axios from 'axios';


function Register() {
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role,setRole]=useState('')
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(" https://module-6.onrender.com/register", {
        name,
        email,
        password,
        role
      });
      alert("Register Successful!");
      navigate('/');
    } catch (err) {
      console.error('Registration failed:',(err));
      alert("Registration failed. Please check your details .");
    }
  };
  return (
       <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleRegister}>
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

         <div className="form-group mb-4">
          <label>Role</label>
          <input
            
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  )
}

export default Register