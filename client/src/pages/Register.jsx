import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { BLOOD_GROUPS } from '../constants';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', password: '', age: '',
    gender: '', bloodGroup: '', phone: '', city: ''
  });
  const [msg, setMsg] = useState({ text: '', type: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      setMsg({ text: 'Registered successfully! Redirecting to login...', type: 'success' });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Registration failed', type: 'danger' });
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: 600 }}>
      <div className="form-card">
        <h3 className="text-danger mb-3">Donor Registration</h3>
        {msg.text && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

        <form onSubmit={handleSubmit}>
          <input name="name" className="form-control mb-2" placeholder="Full name"
            value={form.name} onChange={handleChange} required />
          <input name="email" type="email" className="form-control mb-2" placeholder="Email"
            value={form.email} onChange={handleChange} required />
          <input name="password" type="password" className="form-control mb-2"
            placeholder="Password (min 6 characters)" minLength={6}
            value={form.password} onChange={handleChange} required />

          <div className="row">
            <div className="col">
              <input name="age" type="number" min="18" max="65" className="form-control mb-2"
                placeholder="Age" value={form.age} onChange={handleChange} required />
            </div>
            <div className="col">
              <select name="gender" className="form-select mb-2"
                value={form.gender} onChange={handleChange} required>
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <select name="bloodGroup" className="form-select mb-2"
            value={form.bloodGroup} onChange={handleChange} required>
            <option value="">Blood group</option>
            {BLOOD_GROUPS.map((g) => <option key={g}>{g}</option>)}
          </select>

          <input name="phone" className="form-control mb-2" placeholder="Phone number"
            pattern="[0-9]{10}" title="10 digit number"
            value={form.phone} onChange={handleChange} required />
          <input name="city" className="form-control mb-3" placeholder="City"
            value={form.city} onChange={handleChange} required />

          <button className="btn btn-danger w-100">Register</button>
        </form>

        <p className="mt-3 mb-0 text-center">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}