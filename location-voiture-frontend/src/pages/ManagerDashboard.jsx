import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ManagerDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('role') !== 'ROLE_MANAGER') navigate('/login');
  }, [navigate]);

  return (
    <div style={{ padding: '100px 5% 50px', minHeight: '100vh', background: 'var(--home-bg)' }}>
      <h1>Espace Manager</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
        <div style={{ padding: '30px', background: 'var(--card-background)', borderRadius: '15px', border: '1px solid var(--border-color)' }}>
          <h3>Gestion des Réservations</h3>
          <p>Acceptez ou refusez les demandes.</p>
          <Link to="/manager/rentals" style={{ color: '#f59e0b', fontWeight: 'bold' }}>Voir les réservations →</Link>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;