import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaBuilding, FaCar } from 'react-icons/fa';
import { mockAgenciesDatabase, mockCarsDatabase } from '../data/carsData';

function Agencies() {
  const [selectedCity, setSelectedCity] = useState('ALL');

  const filteredAgencies = selectedCity === 'ALL' 
    ? mockAgenciesDatabase 
    : mockAgenciesDatabase.filter(agency => agency.city === selectedCity);

  const getCarCount = (agencyId) => {
    return mockCarsDatabase.filter(car => car.agencyId === agencyId).length;
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
      
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '10px', letterSpacing: '-1px' }}>
            Nos Agences locales
          </h1>
          <p style={{ color: 'var(--home-desc)', fontSize: '16px', margin: 0 }}>
            Trouvez l'agence la plus proche pour récupérer ou déposer votre véhicule de location.
          </p>
        </div>

        <div>
          <select 
            value={selectedCity} 
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              background: 'var(--card-background)',
              border: '1px solid var(--border-color)',
              color: 'var(--home-text)',
              fontSize: '14px',
              fontWeight: '700',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="ALL">Toutes les villes</option>
            <option value="Casablanca">Casablanca</option>
            <option value="Marrakech">Marrakech</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
        {filteredAgencies.map((agency) => (
          <div key={agency.id} style={{
            background: 'var(--card-background)',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.01)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'background 0.4s ease'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ background: '#f59e0b20', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FaBuilding size={20} color="#f59e0b" />
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>{agency.name}</h3>
                  <span style={{ fontSize: '12px', color: 'var(--home-desc)', textTransform: 'uppercase', fontWeight: '700' }}>{agency.state}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '25px', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--home-desc)' }}>
                  <FaMapMarkerAlt size={16} color="#f59e0b" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>{agency.address}, {agency.city}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--home-desc)' }}>
                  <FaPhone size={16} color="#f59e0b" style={{ flexShrink: 0 }} />
                  <span>{agency.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--home-desc)' }}>
                  <FaEnvelope size={16} color="#f59e0b" style={{ flexShrink: 0 }} />
                  <span>{agency.email}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '700', color: 'var(--home-text)' }}>
                <FaCar color="#f59e0b" /> {getCarCount(agency.id)} Véhicules
              </span>
              <Link 
                to="/cars"
                style={{
                  background: 'var(--card-inline)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--home-text)',
                  padding: '10px 18px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease'
                }}
              >
                Voir la flotte
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Agencies;