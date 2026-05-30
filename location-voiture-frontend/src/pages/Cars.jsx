import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // IMPORT AJOUTÉ ICI
import { FaGasPump, FaCogs, FaSearch } from 'react-icons/fa';
import { mockCarsDatabase } from '../data/carsData';

function Cars() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('ALL');
  const [selectedTransmission, setSelectedTransmission] = useState('ALL');
  const [maxPrice, setMaxPrice] = useState(700); 

  const filteredCars = mockCarsDatabase.filter((car) => {
    const matchesSearch = 
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFuel = selectedFuel === 'ALL' || car.fuelType === selectedFuel;
    
    const matchesTransmission = selectedTransmission === 'ALL' || car.transmission === selectedTransmission;
    
    const matchesPrice = car.dailyRate <= maxPrice;

    return matchesSearch && matchesFuel && matchesTransmission && matchesPrice;
  });

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
          Notre Flotte de Véhicules
        </h1>
        <p style={{ color: 'var(--home-desc)', fontSize: '16px', margin: 0 }}>
          Recherchez et filtrez nos véhicules disponibles pour trouver le partenaire idéal de votre voyage.
        </p>
      </div>

      <div style={{
        background: 'var(--card-background)',
        border: '1px solid var(--border-color)',
        borderRadius: '24px',
        padding: '30px',
        marginBottom: '40px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        transition: 'background 0.4s ease'
      }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <FaSearch style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--home-desc)' }} size={18} />
          <input 
            type="text" 
            placeholder="Rechercher par marque ou modèle (ex: Toyota, Golf...)" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 20px 16px 55px',
              borderRadius: '14px',
              background: 'var(--card-inline)',
              border: '1px solid var(--border-color)',
              color: 'var(--home-text)',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.2s ease'
            }}
          />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          
          <div style={{ flex: '1', minWidth: '180px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px', color: 'var(--home-desc)', textTransform: 'uppercase' }}>
              Carburant
            </label>
            <select 
              value={selectedFuel} 
              onChange={(e) => setSelectedFuel(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                background: 'var(--card-inline)',
                border: '1px solid var(--border-color)',
                color: 'var(--home-text)',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="ALL">Tous les types</option>
              <option value="GASOLINE">Gasoline</option>
              <option value="DIESEL">Diesel</option>
              <option value="HYBRID">Hybrid</option>
              <option value="ELECTRIC">Electric</option>
            </select>
          </div>

          <div style={{ flex: '1', minWidth: '180px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '8px', color: 'var(--home-desc)', textTransform: 'uppercase' }}>
              Transmission
            </label>
            <select 
              value={selectedTransmission} 
              onChange={(e) => setSelectedTransmission(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                background: 'var(--card-inline)',
                border: '1px solid var(--border-color)',
                color: 'var(--home-text)',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="ALL">Toutes les boîtes</option>
              <option value="MANUAL">Manuelle</option>
              <option value="AUTOMATIC">Automatique</option>
            </select>
          </div>

          <div style={{ flex: '1.5', minWidth: '220px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--home-desc)', textTransform: 'uppercase' }}>
                Budget max par jour
              </label>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#f59e0b' }}>{maxPrice} DH</span>
            </div>
            <input 
              type="range" 
              min="300" 
              max="1000" 
              step="50"
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: '#f59e0b',
                cursor: 'pointer'
              }}
            />
          </div>

        </div>
      </div>

      {filteredCars.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'var(--card-background)',
          borderRadius: '24px',
          border: '1px solid var(--border-color)'
        }}>
          <p style={{ fontSize: '18px', color: 'var(--home-desc)', margin: 0 }}>
            Aucun véhicule ne correspond à vos critères de recherche.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {filteredCars.map((car) => (
            <div key={car.id} style={{
              background: 'var(--card-background)',
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'background 0.4s ease'
            }}>
              <div style={{ height: '220px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                <img src={car.image} alt={`${car.brand} ${car.model}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: car.status === 'AVAILABLE' ? '#10b981' : '#ef4444',
                  color: '#fff',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '700'
                }}>
                  {car.status}
                </span>
              </div>
              <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13px', color: '#f59e0b', fontWeight: '700', textTransform: 'uppercase', marginBottom: '5px' }}>{car.brand}</span>
                <h3 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 15px 0', color: 'var(--home-text)' }}>{car.model}</h3>
                
                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--home-desc)' }}>
                    <FaGasPump size={14} color="#f59e0b" /> {car.fuelType}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--home-desc)' }}>
                    <FaCogs size={14} color="#f59e0b" /> {car.transmission}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <div>
                    <span style={{ fontSize: '24px', fontWeight: '900', color: 'var(--home-text)' }}>{car.dailyRate} DH</span>
                    <span style={{ fontSize: '13px', color: 'var(--home-desc)' }}> / jour</span>
                  </div>
                  <Link 
  to={`/car-details/${car.id}`}
  style={{
    background: '#f59e0b',
    color: '#0f172a',
    padding: '10px 20px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '700',
    textDecoration: 'none',
    display: 'inline-block'
  }}
>
  Détails
</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cars;