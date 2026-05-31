import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaGasPump, FaCogs, FaCheck, FaTimes, FaCar, FaIdCard, FaPalette, FaDoorOpen, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

function CarDetails() {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/cars/${carId}`, {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      setCar(data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Erreur:", err);
      setLoading(false);
    });
  }, [carId]);

  if (loading) return <div style={{ padding: '120px 10%', color: 'var(--home-text)' }}>Chargement en cours...</div>;
  if (!car) return <div style={{ padding: '120px 10%', color: 'var(--home-text)' }}>Véhicule introuvable.</div>;

  // Sous-composant pour les cartes d'information
  const InfoCard = ({ icon, label, value }) => (
    <div style={{ background: 'var(--card-inline)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '15px' }}>
      <div style={{ color: '#f59e0b' }}>{icon}</div>
      <div>
        <div style={{ fontSize: '12px', color: 'var(--home-desc)' }}>{label}</div>
        <div style={{ fontWeight: '700', fontSize: '16px' }}>{value}</div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--home-bg)', color: 'var(--home-text)', padding: '120px 10% 60px 10%' }}>
      <Link to="/cars" style={{ color: '#f59e0b', textDecoration: 'none', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '30px' }}>
        &larr; RETOUR AU CATALOGUE
      </Link>
      
      <div style={{ background: 'var(--card-background)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
          <div>
            <span style={{ background: '#f59e0b', color: '#0f172a', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '800' }}>{car.brand}</span>
            <h1 style={{ fontSize: '48px', fontWeight: '900', margin: '10px 0' }}>{car.model}</h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '14px', color: 'var(--home-desc)' }}>Tarif journalier</div>
            <div style={{ fontSize: '32px', fontWeight: '800' }}>{car.dailyRate} DH</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <InfoCard icon={<FaCalendarAlt />} label="Année" value={car.year} />
          <InfoCard icon={<FaGasPump />} label="Énergie" value={car.fuelType} />
          <InfoCard icon={<FaCogs />} label="Transmission" value={car.transmission} />
          <InfoCard icon={<FaCar />} label="Kilométrage" value={`${car.mileage} KM`} />
          <InfoCard icon={<FaIdCard />} label="Immatriculation" value={car.registrationPlate} />
          <InfoCard icon={<FaPalette />} label="Couleur" value={car.color} />
          <InfoCard icon={<FaDoorOpen />} label="Portes / Places" value={`${car.numberOfDoors}P / ${car.numberOfSeats} Places`} />
          <InfoCard icon={<FaMapMarkerAlt />} label="Agence" value={car.agencyName || 'Non spécifiée'} />
        </div>

        <div style={{ marginTop: '40px', borderTop: '1px solid var(--border-color)', paddingTop: '30px' }}>
          <h3 style={{ marginBottom: '20px' }}>Options incluses</h3>
          <div style={{ display: 'flex', gap: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {car.hasAirConditioning ? <FaCheck color="#10b981" /> : <FaTimes color="#ef4444" />} Climatisation
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {car.hasGPS ? <FaCheck color="#10b981" /> : <FaTimes color="#ef4444" />} GPS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;