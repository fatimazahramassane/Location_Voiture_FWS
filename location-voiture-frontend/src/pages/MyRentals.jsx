import React from 'react';
import { FaClock, FaCheckCircle, FaTimesCircle, FaCar, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';
import { mockRentalsDatabase } from '../data/carsData';

function MyRentals() {
  const getStatusBadge = (status) => {
    const styles = {
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '13px',
      fontWeight: '700',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px'
    };

    switch (status) {
      case 'PENDING':
        return <span style={{ ...styles, background: '#f59e0b20', color: '#f59e0b' }}><FaClock /> En attente</span>;
      case 'ACTIVE':
        return <span style={{ ...styles, background: '#3b82f620', color: '#3b82f6' }}><FaCar /> Active</span>;
      case 'COMPLETED':
        return <span style={{ ...styles, background: '#10b98120', color: '#10b981' }}><FaCheckCircle /> Terminée</span>;
      case 'CANCELLED':
        return <span style={{ ...styles, background: '#ef444420', color: '#ef4444' }}><FaTimesCircle /> Annulée</span>;
      default:
        return <span style={{ ...styles, background: '#64748b20', color: '#64748b' }}>{status}</span>;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--home-bg)',
      color: 'var(--home-text)',
      padding: '120px 10% 60px 10%',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      transition: 'background 0.4s ease, color 0.4s ease'
    }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '10px', letterSpacing: '-1px' }}>
          Mes Réservations
        </h1>
        <p style={{ color: 'var(--home-desc)', fontSize: '16px', margin: 0 }}>
          Suivez l'état de vos demandes de location et consultez votre historique.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {mockRentalsDatabase.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', background: 'var(--card-background)', borderRadius: '16px' }}>
            <p style={{ color: 'var(--home-desc)' }}>Vous n'avez effectué aucune réservation pour le moment.</p>
          </div>
        ) : (
          mockRentalsDatabase.map((rental) => (
            <div key={rental.id} style={{
              background: 'var(--card-background)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              padding: '25px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.01)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{
                  background: 'var(--card-inline)',
                  padding: '15px',
                  borderRadius: '14px',
                  border: '1px solid var(--border-color)'
                }}>
                  <FaCar size={24} color="#f59e0b" />
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 5px 0' }}>
                    {rental.car.brand} {rental.car.model}
                  </h3>
                  <span style={{ fontSize: '13px', color: 'var(--home-desc)', background: 'var(--card-inline)', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    {rental.car.registrationPlate}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '30px' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--home-desc)', marginBottom: '5px' }}>DEBUT</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: '600' }}>
                    <FaCalendarAlt size={14} color="var(--home-desc)" /> {rental.startDate}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--home-desc)', marginBottom: '5px' }}>FIN</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: '600' }}>
                    <FaCalendarAlt size={14} color="var(--home-desc)" /> {rental.endDate}
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--home-desc)', marginBottom: '5px' }}>COÛT TOTAL</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '20px', fontWeight: '900', color: '#f59e0b' }}>
                  <FaMoneyBillWave size={16} /> {rental.totalCost} DH
                </div>
              </div>

              <div>
                {getStatusBadge(rental.status)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyRentals;