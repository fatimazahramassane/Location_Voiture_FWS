import React, { useState, useEffect } from 'react';
import { FaClock, FaCheckCircle, FaTimesCircle, FaCar, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';

function ClientDashboard() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/rentals/my-history', { 
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      } 
    })
    .then(res => res.json())
    .then(data => {
      setRentals(data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Erreur chargement réservations:", err);
      setLoading(false);
    });
  }, []);

  const getStatusBadge = (status) => {
    const styles = { padding: "6px 12px", borderRadius: "20px", fontSize: "13px", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "6px" };
    switch (status) {
      case "PENDING": return <span style={{...styles, background: "#f59e0b20", color: "#f59e0b"}}><FaClock /> En attente</span>;
      case "ACTIVE": return <span style={{...styles, background: "#3b82f620", color: "#3b82f6"}}><FaCar /> Active</span>;
      case "COMPLETED": return <span style={{...styles, background: "#10b98120", color: "#10b981"}}><FaCheckCircle /> Terminée</span>;
      case "CANCELLED": return <span style={{...styles, background: "#ef444420", color: "#ef4444"}}><FaTimesCircle /> Annulée</span>;
      default: return <span style={{...styles, background: "#64748b20", color: "#64748b"}}>{status}</span>;
    }
  };

  if (loading) return <div style={{ padding: "120px 10%" }}>Chargement...</div>;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--home-bg)', color: 'var(--home-text)', padding: '120px 10% 60px 10%' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '10px' }}>Mon Espace Client</h1>
        <p style={{ color: 'var(--home-desc)' }}>Historique de vos réservations et statut de vos demandes.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {rentals.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', background: 'var(--card-background)', borderRadius: '16px' }}>
            <p>Vous n'avez effectué aucune réservation.</p>
          </div>
        ) : (
          rentals.map(rental => (
            <div key={rental.id} style={{ background: 'var(--card-background)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ background: 'var(--card-inline)', padding: '15px', borderRadius: '14px' }}>
                  <FaCar size={24} color="#f59e0b" />
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>{rental.carBrand} {rental.carModel}</h3>
                  <span style={{ fontSize: '12px', color: 'var(--home-desc)' }}>ID: #{rental.id}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '30px' }}>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--home-desc)' }}>DÉBUT</div>
                  <div><FaCalendarAlt size={12} /> {rental.startDate}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--home-desc)' }}>FIN</div>
                  <div><FaCalendarAlt size={12} /> {rental.endDate}</div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '10px', color: 'var(--home-desc)' }}>COÛT TOTAL</div>
                <div style={{ fontWeight: '900', color: '#f59e0b' }}><FaMoneyBillWave /> {rental.totalCost} DH</div>
              </div>

              <div>{getStatusBadge(rental.status)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ClientDashboard;