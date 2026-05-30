import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import Login from './pages/Login';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminCars from './pages/AdminCars';
import AdminBookings from './pages/AdminBookings';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Booking from './pages/Booking';
import MyRentals from './pages/MyRentals';
import Agencies from './pages/Agencies';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Routes Publiques / Clients */}
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/booking/:carId" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/my-rentals" element={<MyRentals />} />
        <Route path="/car-details/:carId" element={<CarDetails />} />
        <Route path="/agencies" element={<Agencies />} />

        {/* Routes Administration */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/cars" element={<AdminCars />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
      </Routes>
      <Footer />
    </Router>

  );
}

export default App;