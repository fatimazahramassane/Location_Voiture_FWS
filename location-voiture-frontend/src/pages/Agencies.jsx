import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaBuilding, FaCar } from 'react-icons/fa';

function Agencies() {
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('ALL');

  useEffect(() => {
    fetch('http://localhost:8080/api/agencies')
      .then(res => res.json())
      .then(data => {
        const promises = data.map(agency => 
          fetch(`http://localhost:8080/api/agencies/${agency.id}/cars`)
            .then(res => res.json())
            .then(cars => ({ ...agency, carCount: cars.length }))
        );
        return Promise.all(promises);
      })
      .then(results => {
        setAgencies(results);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur:", err);
        setLoading(false);
      });
  }, []);

  const uniqueCities = ['ALL', ...new Set(agencies.map(a => a.city))];

  const filteredAgencies = selectedCity === 'ALL' 
    ? agencies 
    : agencies.filter(agency => agency.city === selectedCity);

  if (loading) return <div style={{ padding: '120px 10%' }}>Chargement...</div>;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--home-bg)', color: 'var(--home-text)', padding: '120px 10% 60px 10%' }}>
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '10px' }}>Nos Agences locales</h1>
          <p style={{ color: 'var(--home-desc)' }}>Trouvez l'agence la plus proche.</p>
        </div>

        <select 
          value={selectedCity} 
          onChange={(e) => setSelectedCity(e.target.value)}
          style={{ padding: '12px 20px', borderRadius: '12px', background: 'var(--card-background)', border: '1px solid var(--border-color)', color: 'var(--home-text)', outline: 'none' }}
        >
          {uniqueCities.map(city => (
            <option key={city} value={city}>{city === 'ALL' ? 'Toutes les villes' : city}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
        {filteredAgencies.map((agency) => (
          <div key={agency.id} style={{ background: 'var(--card-background)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '30px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: '#f59e0b20', padding: '12px', borderRadius: '12px' }}>
                <FaBuilding size={20} color="#f59e0b" />
              </div>
              <div>
                <h3 style={{ margin: 0 }}>{agency.name}</h3>
                <span style={{ fontSize: '12px', color: 'var(--home-desc)' }}>{agency.state}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', fontSize: '14px', color: 'var(--home-desc)' }}>
              <div><FaMapMarkerAlt color="#f59e0b" /> {agency.address}, {agency.city}</div>
              <div><FaPhone color="#f59e0b" /> {agency.phone}</div>
              <div><FaEnvelope color="#f59e0b" /> {agency.email}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', alignItems: 'center' }}>
              <span style={{ fontWeight: '700' }}><FaCar color="#f59e0b" /> {agency.carCount} Véhicules</span>
              <Link to={`/cars?agencyId=${agency.id}`} style={{ background: 'var(--card-inline)', padding: '10px 18px', borderRadius: '12px', textDecoration: 'none', color: 'var(--home-text)', fontSize: '13px', fontWeight: '700' }}>
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