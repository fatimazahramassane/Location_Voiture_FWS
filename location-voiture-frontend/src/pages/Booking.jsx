import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaCoins, FaCar } from 'react-icons/fa';
import { mockCarsDatabase } from '../data/carsData';

function Booking() {
  const { carId } = useParams();
  const navigate = useNavigate();
  
  const car = mockCarsDatabase.find(c => c.id === parseInt(carId));

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('Aéroport Mohammed V - Casablanca');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (startDate && endDate && car) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDiff = end.getTime() - start.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      if (daysDiff > 0) {
        setTotalPrice(daysDiff * car.dailyRate);
      } else {
        setTotalPrice(0);
      }
    }
  }, [startDate, endDate, car]);

  if (!car) {
    return <div style={{ padding: '120px 10%', color: 'var(--home-text)' }}>Véhicule introuvable.</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalPrice <= 0) {
      alert("La date de fin doit être postérieure à la date de début.");
      return;
    }
    
    alert(`Réservation enregistrée avec succès pour la ${car.brand} ${car.model} ! Total : ${totalPrice} DH`);
    navigate('/cars');
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
      <h1 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '30px', letterSpacing: '-1px' }}>
        Finaliser votre réservation
      </h1>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        
        <form onSubmit={handleSubmit} style={{
          flex: '1.5',
          background: 'var(--card-background)',
          border: '1px solid var(--border-color)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700', marginBottom: '10px', color: 'var(--home-desc)' }}>
              <FaMapMarkerAlt color="#f59e0b" /> LIEU DE PRISE EN CHARGE
            </label>
            <select 
              value={pickupLocation} 
              onChange={(e) => setPickupLocation(e.target.value)}
              style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'var(--card-inline)', border: '1px solid var(--border-color)', color: 'var(--home-text)', fontSize: '15px', outline: 'none' }}
            >
              <option value="Aéroport Mohammed V - Casablanca">Aéroport Mohammed V - Casablanca</option>
              <option value="Aéroport Menara - Marrakech">Aéroport Menara - Marrakech</option>
              <option value="Centre Ville - Rabat">Centre Ville - Rabat</option>
              <option value="Aéroport Ibn Battouta - Tanger">Aéroport Ibn Battouta - Tanger</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '200px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700', marginBottom: '10px', color: 'var(--home-desc)' }}>
                <FaCalendarAlt color="#f59e0b" /> DATE DE DÉBUT
              </label>
              <input 
                type="date" 
                required
                value={startDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'var(--card-inline)', border: '1px solid var(--border-color)', color: 'var(--home-text)', fontSize: '15px', outline: 'none' }}
              />
            </div>

            <div style={{ flex: '1', minWidth: '200px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700', marginBottom: '10px', color: 'var(--home-desc)' }}>
                <FaCalendarAlt color="#f59e0b" /> DATE DE FIN
              </label>
              <input 
                type="date" 
                required
                value={endDate}
                min={startDate || new Date().toISOString().split('T')[0]}
                onChange={(e) => setEndDate(e.target.value)}
                style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'var(--card-inline)', border: '1px solid var(--border-color)', color: 'var(--home-text)', fontSize: '15px', outline: 'none' }}
              />
            </div>
          </div>

          <button type="submit" style={{
            background: '#f59e0b',
            color: '#0f172a',
            padding: '16px',
            borderRadius: '14px',
            fontSize: '16px',
            fontWeight: '700',
            border: 'none',
            cursor: 'pointer',
            marginTop: '10px',
            boxShadow: '0 10px 25px rgba(245, 158, 11, 0.2)'
          }}>
            Confirmer la Réservation
          </button>
        </form>

        <div style={{
          flex: '1',
          background: 'var(--card-background)',
          border: '1px solid var(--border-color)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 'fit-content'
        }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaCar color="#f59e0b" /> Détails du véhicule
            </h2>
            <div style={{ fontSize: '28px', fontWeight: '900', marginBottom: '5px' }}>{car.brand}</div>
            <div style={{ fontSize: '18px', color: 'var(--home-desc)', marginBottom: '25px' }}>{car.model} ({car.year})</div>
            
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                <span style={{ color: 'var(--home-desc)' }}>Tarif journalier :</span>
                <span style={{ fontWeight: '700' }}>{car.dailyRate} DH / jour</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                <span style={{ color: 'var(--home-desc)' }}>Transmission :</span>
                <span style={{ fontWeight: '700' }}>{car.transmission}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                <span style={{ color: 'var(--home-desc)' }}>Carburant :</span>
                <span style={{ fontWeight: '700' }}>{car.fuelType}</span>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '2px dashed var(--border-color)', marginTop: '30px', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '18px', fontWeight: '700' }}>Prix Total :</span>
              <span style={{ fontSize: '32px', fontWeight: '900', color: '#f59e0b' }}>{totalPrice} DH</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Booking;