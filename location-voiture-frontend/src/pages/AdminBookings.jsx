import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import './AdminCars.css'; 

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/rentals', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(data => setBookings(data));
  }, []);

  const updateStatus = async (id, newStatus) => {
    await fetch(`http://localhost:8080/api/rentals/${id}/status`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ status: newStatus })
    });
    window.location.reload();
  };

  return (
    <div className="admin-page">
      <div className="top-bar">
        <h1>Gestion des Réservations</h1>
      </div>

      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Client</th><th>Voiture</th><th>Dates</th><th>Total</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.customerName}</td>
                <td>{booking.carBrand} {booking.carModel}</td>
                <td>{booking.startDate} - {booking.endDate}</td>
                <td>{booking.totalCost} DH</td>
                <td><span style={{ fontWeight: 'bold' }}>{booking.status}</span></td>
                <td>
                  {booking.status === 'PENDING' && (
                    <>
                      <button onClick={() => updateStatus(booking.id, 'ACTIVE')} style={{ color: 'green', background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px' }}><FaCheck /></button>
                      <button onClick={() => updateStatus(booking.id, 'CANCELLED')} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes /></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminBookings;