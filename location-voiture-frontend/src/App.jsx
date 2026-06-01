import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminCars from './pages/AdminCars';
import AdminBookings from './pages/AdminBookings';
import Booking from './pages/Booking';
import MyRentals from './pages/MyRentals';
import Agencies from './pages/Agencies';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) return <Navigate to="/login" />;
  if (allowedRole && role !== allowedRole && role !== 'ROLE_ADMIN') return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Routes Publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/car-details/:carId" element={<CarDetails />} />
        <Route path="/agencies" element={<Agencies />} />

        {/* Routes Client (Protected) */}
        <Route path="/user/dashboard" element={
          <ProtectedRoute>
            <ClientDashboard />
          </ProtectedRoute>
        } />
        <Route path="/booking/:carId" element={
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        } />
        <Route path="/my-rentals" element={
          <ProtectedRoute>
            <MyRentals />
          </ProtectedRoute>
        } />

        {/* Routes Administration (Protected) */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRole="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/cars" element={
          <ProtectedRoute allowedRole="ADMIN">
            <AdminCars />
          </ProtectedRoute>
        } />
        <Route path="/admin/bookings" element={
          <ProtectedRoute allowedRole="ADMIN">
            <AdminBookings />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;