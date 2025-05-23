import React, { useState } from 'react';
import axios from 'axios';
import styles from './AdminLogin.module.css';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('https://restaurant-backend-10.onrender.com/api/admin/login', { email, password });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit} className={`p-4 border rounded ${styles.loginCard}`}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label>Email</label>
          <input type="email" required className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" required className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="btn btn-dark w-100">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
