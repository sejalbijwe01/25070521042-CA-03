import { useEffect, useState } from 'react';
import api from '../api';
import { BLOOD_GROUPS } from '../constants';

export default function SearchDonors() {
  const [filters, setFilters] = useState({ bloodGroup: '', city: '' });
  const [donors, setDonors] = useState([]);

  const search = async () => {
    const { data } = await api.get('/donors/search', { params: filters });
    setDonors(data);
  };

  useEffect(() => {
    search();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container my-5">
      <h3 className="text-danger mb-3">Find Blood Donors</h3>

      <div className="form-card mb-4">
        <div className="row g-2">
          <div className="col-md-4">
            <select className="form-select" value={filters.bloodGroup}
              onChange={(e) => setFilters({ ...filters, bloodGroup: e.target.value })}>
              <option value="">All blood groups</option>
              {BLOOD_GROUPS.map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div className="col-md-5">
            <input className="form-control" placeholder="City" value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })} />
          </div>
          <div className="col-md-3">
            <button className="btn btn-danger w-100" onClick={search}>Search</button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped bg-white">
          <thead className="table-danger">
            <tr><th>Name</th><th>Blood Group</th><th>City</th><th>Phone</th></tr>
          </thead>
          <tbody>
            {donors.length ? donors.map((d) => (
              <tr key={d._id}>
                <td>{d.name}</td>
                <td><span className="badge bg-danger">{d.bloodGroup}</span></td>
                <td>{d.city}</td>
                <td>{d.phone}</td>
              </tr>
            )) : (
              <tr><td colSpan="4" className="text-center">No donors found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}