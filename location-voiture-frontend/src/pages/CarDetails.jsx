import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaGasPump, FaCogs, FaCheck, FaTimes, FaCar, FaIdCard, FaPalette, FaDoorOpen, FaUsers } from 'react-icons/fa';
import { mockCarsDatabase } from '../data/carsData';

function CarDetails() {
  const { carId } = useParams();
  const car = mockCarsDatabase.find(c => c.id === parseInt(carId));

  if (!car) {
    return (
      <div style={{ padding: '120px 10%', color: 'var(--home-text)', minHeight: '100vh', background: 'var(--home-bg)' }}>
        <h2>Véhicule introuvable.</h2>
        <Link to="/cars" style={{ color: '#f59e0b', textDecoration: 'none', fontWeight: '700' }}>Retour au catalogue</Link>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--home-bg)',
      color: 'var(--home-text)',
      padding: '120px 10% 60px 10%',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      transition: 'background 0.4s ease, color 0.4s ease'
    }}>
      
      <div style={{ marginBottom: '30px' }}>
        <Link to="/cars" style={{ color: '#f59e0b', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
          &larr; RETOUR AU CATALOGUE
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        
        <div style={{ flex: '1', minWidth: '300px' }}>
          <div style={{ 
            position: 'relative', 
            borderRadius: '24px', 
            overflow: 'hidden', 
            border: '1px solid var(--border-color)',
            height: '350px'
          }}>
            <img 
              src={car.image} 
              alt={`${car.brand} ${car.model}`} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            <span style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: car.status === 'AVAILABLE' ? '#10b981' : '#ef4444',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '700'
            }}>
              {car.status}
            </span>
          </div>

          <div style={{
            marginTop: '30px',
            background: 'var(--card-background)',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            padding: '30px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '14px', color: 'var(--home-desc)', marginBottom: '5px' }}>Tarif de location</div>
            <div style={{ fontSize: '36px', fontWeight: '900', color: 'var(--home-text)' }}>
              {car.dailyRate} DH <span style={{ fontSize: '16px', color: 'var(--home-desc)', fontWeight: '500' }}>/ jour</span>
            </div>
            
            <Link 
              to={car.status === 'AVAILABLE' ? `/booking/${car.id}` : '#'}
              style={{
                display: 'block',
                marginTop: '20px',
                background: car.status === 'AVAILABLE' ? '#f59e0b' : '#334155',
                color: car.status === 'AVAILABLE' ? '#0f172a' : '#94a3b8',
                padding: '16px',
                borderRadius: '14px',
                fontSize: '16px',
                fontWeight: '700',
                textDecoration: 'none',
                pointerEvents: car.status === 'AVAILABLE' ? 'auto' : 'none',
                boxShadow: car.status === 'AVAILABLE' ? '0 10px 25px rgba(245, 158, 11, 0.2)' : 'none'
              }}
            >
              {car.status === 'AVAILABLE' ? 'Procéder à la réservation' : 'Véhicule Indisponible'}
            </Link>
          </div>
        </div>
        <div style={{ 
          flex: '1.5', 
          minWidth: '400px',
          background: 'var(--card-background)',
          border: '1px solid var(--border-color)',
          borderRadius: '24px',
          padding: '40px'
        }}>
          <span style={{ fontSize: '14px', color: '#f59e0b', fontWeight: '800', textTransform: 'uppercase' }}>
            {car.brand}
          </span>
          <h1 style={{ fontSize: '36px', fontWeight: '900', margin: '5px 0 20px 0', color: 'var(--home-text)' }}>
            {car.model} <span style={{ fontSize: '22px', color: 'var(--home-desc)', fontWeight: '500' }}>({car.year})</span>
          </h1>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '20px',
            marginTop: '30px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--card-inline)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <FaGasPump size={20} color="#f59e0b" />
              <div>
                <div style={{ fontSize: '12px', color: 'var(--home-desc)' }}>Énergie</div>
                <div style={{ fontWeight: '700', fontSize: '15px' }}>{car.fuelType}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--card-inline)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <FaCogs size={20} color="#f59e0b" />
              <div>
                <div style={{ fontSize: '12px', color: 'var(--home-desc)' }}>Transmission</div>
                <div style={{ fontWeight: '700', fontSize: '15px' }}>{car.transmission}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--card-inline)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <FaCar size={20} color="#f59e0b" />
              <div>
                <div style={{ fontSize: '12px', color: 'var(--home-desc)' }}>Kilométrage</div>
                <div style={{ fontWeight: '700', fontSize: '15px' }}>{car.mileage} KM</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--card-inline)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <FaIdCard size={20} color="#f59e0b" />
              <div>
                <div style={{ fontSize: '12px', color: 'var(--home-desc)' }}>Immatriculation</div>
                <div style={{ fontWeight: '700', fontSize: '15px' }}>{car.registrationPlate}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--card-inline)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <FaPalette size={20} color="#f59e0b" />
              <div>
                <div style={{ fontSize: '12px', color: 'var(--home-desc)' }}>Couleur Extérieure</div>
                <div style={{ fontWeight: '700', fontSize: '15px' }}>{car.color}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--card-inline)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <FaDoorOpen size={20} color="#f59e0b" />
              <div>
                <div style={{ fontSize: '12px', color: 'var(--home-desc)' }}>Portes / Places</div>
                <div style={{ fontWeight: '700', fontSize: '15px' }}>{car.numberOfDoors} P / {car.numberOfSeats} Places</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '25px', background: 'var(--card-inline)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)', fontSize: '14px' }}>
            <span style={{ color: 'var(--home-desc)' }}>Numéro de châssis (VIN) :</span> <strong style={{ fontFamily: 'monospace', fontSize: '15px', marginLeft: '5px' }}>{car.vin}</strong>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: '800', marginTop: '35px', marginBottom: '15px' }}>Équipements inclus</h3>
          <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}>
              {car.hasAirConditioning ? <FaCheck color="#10b981" /> : <FaTimes color="#ef4444" />}
              <span style={{ color: car.hasAirConditioning ? 'var(--home-text)' : 'var(--home-desc)' }}>Climatisation</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}>
              {car.hasGPS ? <FaCheck color="#10b981" /> : <FaTimes color="#ef4444" />}
              <span style={{ color: car.hasGPS ? 'var(--home-text)' : 'var(--home-desc)' }}>Système de navigation GPS</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default CarDetails;