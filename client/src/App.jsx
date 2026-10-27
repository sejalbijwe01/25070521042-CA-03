import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchDonors from './pages/SearchDonors';
import RequestBlood from './pages/RequestBlood';

export default function App() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: '70vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchDonors />} />
          <Route
            path="/request"
            element={<ProtectedRoute><RequestBlood /></ProtectedRoute>}
          />
          {/* more pages will be added here later */}
        </Routes>
      </div>
      <Footer />
    </>
  );
}