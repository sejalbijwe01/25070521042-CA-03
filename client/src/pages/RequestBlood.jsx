import { useState } from 'react';
import api from '../api';
import { BLOOD_GROUPS } from '../constants';

const emptyForm = {
  patientName: '', bloodGroup: '', units: '',
  hospital: '', city: '', contact: '', urgent: false
};

export default function RequestBlood() {
  const [form, setForm] = useState(emptyForm);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/requests', { ...form, units: Number(form.units) });
      setMsg({ text: 'Request submitted successfully!', type: 'success' });
      setForm(emptyForm);
    } catch (err) {
      setMsg({ text: err.response?.data?.message || 'Something went wrong', type: 'danger' });
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: 600 }}>
      <div className="form-card">
        <h3 className="text-danger mb-3">Request Blood</h3>
        {msg.text && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

        <form onSubmit={handleSubmit}>
          <input name="patientName" className="form-control mb-2" placeholder="Patient name"
            value={form.patientName} onChange={handleChange} required />
          <select name="bloodGroup" className="form-select mb-2"
            value={form.bloodGroup} onChange={handleChange} required>
            <option value="">Blood group needed</option>
            {BLOOD_GROUPS.map((g) => <option key={g}>{g}</option>)}
          </select>
          <input name="units" type="number" min="1" className="form-control mb-2"
            placeholder="Units required" value={form.units} onChange={handleChange} required />
          <input name="hospital" className="form-control mb-2" placeholder="Hospital name"
            value={form.hospital} onChange={handleChange} required />
          <input name="city" className="form-control mb-2" placeholder="City"
            value={form.city} onChange={handleChange} required />
          <input name="contact" className="form-control mb-2" placeholder="Contact number"
            value={form.contact} onChange={handleChange} required />

          <div className="form-check mb-3">
            <input id="urgent" name="urgent" type="checkbox" className="form-check-input"
              checked={form.urgent} onChange={handleChange} />
            <label className="form-check-label" htmlFor="urgent">This is an emergency</label>
          </div>

          <button className="btn btn-danger w-100">Submit Request</button>
        </form>
      </div>
    </div>
  );
}