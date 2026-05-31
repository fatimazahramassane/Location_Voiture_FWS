import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaCar, FaUser, FaEnvelope, FaPhone, FaIdCard } from 'react-icons/fa';

function Booking() {
  const { carId } = useParams();
  const navigate = useNavigate();
  
  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerLicenseNumber: ''
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8080/api/cars/${carId}`, {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => setCar(data))
    .catch(err => console.error("Erreur chargement voiture:", err));
  }, [carId]);

  useEffect(() => {
    if (startDate && endDate && car) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const daysDiff = Math.ceil((end - start) / (1000 * 3600 * 24));
      setTotalPrice(daysDiff > 0 ? daysDiff * car.dailyRate : 0);
    }
  }, [startDate, endDate, car]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    
    const requestData = {
      ...formData,
      startDate,
      endDate,
      carId: parseInt(carId)
    };

    try {
      const response = await fetch('http://localhost:8080/api/rentals', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        alert("Réservation envoyée avec succès !");
        navigate('/cars');
      } else {
        const error = await response.json();
        alert("Erreur de réservation : " + (error.message || "Accès refusé"));
      }
    } catch (err) {
      console.error("Erreur réseau:", err);
      alert("Erreur de connexion au serveur.");
    }
  };

  if (!car) return <div style={{ padding: '120px 10%' }}>Chargement...</div>;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--home-bg)', color: 'var(--home-text)', padding: '120px 10%' }}>
      <h1 style={{ marginBottom: '30px' }}>Finaliser votre réservation</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1.5', background: 'var(--card-background)', padding: '30px', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <input placeholder="Nom complet" required onChange={(e) => setFormData({...formData, customerName: e.target.value})} style={{ padding: '14px', borderRadius: '12px', background: 'var(--card-inline)', border: '1px solid var(--border-color)', color: 'var(--home-text)' }} />
            <input placeholder="Email" type="email" required onChange={(e) => setFormData({...formData, customerEmail: e.target.value})} style={{ padding: '14px', borderRadius: '12px', background: 'var(--card-inline)', border: '1px solid var(--border-color)', color: 'var(--home-text)' }} />
            <input placeholder="Téléphone" required onChange={(e) => setFormData({...formData, customerPhone: e.target.value})} style={{ padding: '14px', borderRadius: '12px', background: 'var(--card-inline)', border: '1px solid var(--border-color)', color: 'var(--home-text)' }} />
            <input placeholder="Numéro de permis" required onChange={(e) => setFormData({...formData, customerLicenseNumber: e.target.value})} style={{ padding: '14px', borderRadius: '12px', background: 'var(--card-inline)', border: '1px solid var(--border-color)', color: 'var(--home-text)' }} />
            <input type="date" required onChange={(e) => setStartDate(e.target.value)} style={{ padding: '14px', borderRadius: '12px', background: 'var(--card-inline)', border: '1px solid var(--border-color)', color: 'var(--home-text)' }} />
            <input type="date" required onChange={(e) => setEndDate(e.target.value)} style={{ padding: '14px', borderRadius: '12px', background: 'var(--card-inline)', border: '1px solid var(--border-color)', color: 'var(--home-text)' }} />
          </div>
          
          <button type="submit" style={{ marginTop: '30px', width: '100%', padding: '16px', background: '#f59e0b', border: 'none', borderRadius: '12px', fontSize: '18px', fontWeight: '800', cursor: 'pointer' }}>
            CONFIRMER LA RÉSERVATION
          </button>
        </div>

        <div style={{ flex: '1', background: 'var(--card-background)', padding: '30px', borderRadius: '24px', border: '1px solid var(--border-color)', height: 'fit-content' }}>
          <h3>{car.brand} {car.model}</h3>
          <p style={{ fontSize: '24px', fontWeight: '900', color: '#f59e0b' }}>{totalPrice} DH</p>
        </div>
      </form>
    </div>
  );
}

export default Booking;