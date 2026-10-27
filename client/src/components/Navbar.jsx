import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">🩸 BloodBank</Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/eligibility">Eligibility</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/search">Find Donors</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/camps">Camps</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/faq">FAQ</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
          </ul>

          <ul className="navbar-nav align-items-center">
            {user ? (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/request">Request Blood</NavLink></li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={user.role === 'admin' ? '/admin' : '/dashboard'}>
                    Dashboard ({user.name})
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="btn btn-light btn-sm ms-2" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                <li className="nav-item">
                  <Link className="btn btn-light btn-sm ms-2" to="/register">Become a Donor</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}