import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { BLOOD_GROUPS } from '../constants';

export default function Home() {
  const [stats, setStats] = useState({ donors: 0, units: 0, camps: 0 });

  useEffect(() => {
    async function loadStats() {
      try {
        const [donors, stock, camps] = await Promise.all([
          api.get('/donors/search'),
          api.get('/stock'),
          api.get('/camps')
        ]);
        setStats({
          donors: donors.data.length,
          units: stock.data.reduce((sum, s) => sum + s.units, 0),
          camps: camps.data.length
        });
      } catch (err) {
        console.log('Server not running?', err.message);
      }
    }
    loadStats();
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Donate Blood, Save Lives</h1>
          <p className="lead my-3">Join our community of donors and help someone in need today.</p>
          <Link to="/register" className="btn btn-light btn-lg me-2">Become a Donor</Link>
          <Link to="/search" className="btn btn-outline-light btn-lg">Find Blood</Link>
        </div>
      </section>

      <div className="container my-5">
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="stat-box"><h2>{stats.donors}</h2><p className="mb-0">Registered Donors</p></div>
          </div>
          <div className="col-md-4">
            <div className="stat-box"><h2>{stats.units}</h2><p className="mb-0">Units Available</p></div>
          </div>
          <div className="col-md-4">
            <div className="stat-box"><h2>{stats.camps}</h2><p className="mb-0">Upcoming Camps</p></div>
          </div>
        </div>

        <h3 className="text-center text-danger mt-5 mb-4">Blood Groups</h3>
        <div className="row g-3">
          {BLOOD_GROUPS.map((g) => (
            <div className="col-6 col-md-3" key={g}>
              <div className="blood-card">{g}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}