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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Routes Publiques / Clients */}
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />

        {/* Routes Administration */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/cars" element={<AdminCars />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
      </Routes>
    </Router>
  );
}

export default App;