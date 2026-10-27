import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      login(data);
      navigate(data.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: 420 }}>
      <div className="form-card">
        <h3 className="text-danger mb-3">Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input type="email" className="form-control mb-2" placeholder="Email"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input type="password" className="form-control mb-3" placeholder="Password"
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <button className="btn btn-danger w-100">Login</button>
        </form>

        <p className="mt-3 mb-0 text-center">
          New here? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}