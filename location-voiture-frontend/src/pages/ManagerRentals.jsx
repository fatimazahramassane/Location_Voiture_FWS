import React, { useState, useEffect } from 'react';

const ManagerRentals = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/rentals', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(data => {
      const myAgency = localStorage.getItem('agencyName');
      const filtered = data.filter(r => r.agencyName === myAgency);
      setRentals(filtered);
    });
  }, []);

  return (
    <div style={{ padding: '100px 5% 50px' }}>
      <h1>Réservations Agence</h1>
      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Client</th><th>Voiture</th><th>Statut</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(rentals) && rentals.map(r => (
            <tr key={r.id}>
              <td>{r.customerName}</td>
              <td>{r.carModel}</td>
              <td>{r.status}</td>
              <td>
                <button>Accepter</button>
                <button>Refuser</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerRentals;