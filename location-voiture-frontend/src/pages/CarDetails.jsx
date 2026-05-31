import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FaGasPump, FaCogs, FaCar, FaIdCard, FaPalette, 
  FaDoorOpen, FaCalendarAlt, FaMapMarkerAlt, FaUsers 
} from 'react-icons/fa';

function CarDetails() {
  const { carId } = useParams();
  const navigate = useNavigate();
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

  if (loading) return <div style={{ padding: '120px 10%' }}>Chargement...</div>;
  if (!car) return <div style={{ padding: '120px 10%' }}>Véhicule introuvable.</div>;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--home-bg)', color: 'var(--home-text)', padding: '120px 10% 60px 10%' }}>
      <Link to="/cars" style={{ color: '#f59e0b', textDecoration: 'none', fontWeight: '700', marginBottom: '20px', display: 'block' }}>
        &larr; RETOUR
      </Link>
      
      <div style={{ background: 'var(--card-background)', padding: '30px', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ fontSize: '32px', margin: '0' }}>{car.brand} {car.model}</h1>
          </div>
          <div style={{ fontSize: '24px', fontWeight: '800' }}>{car.dailyRate} DH / jour</div>
        </div>

        {/* Grille compacte */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }}>
            {[
                { icon: <FaGasPump />, label: 'Énergie', val: car.fuelType },
                { icon: <FaCogs />, label: 'Boîte', val: car.transmission },
                { icon: <FaCar />, label: 'KM', val: car.mileage },
                { icon: <FaPalette />, label: 'Couleur', val: car.color },
                { icon: <FaDoorOpen />, label: 'Portes', val: car.numberOfDoors },
                { icon: <FaUsers />, label: 'Places', val: car.numberOfSeats },
                { icon: <FaIdCard />, label: 'Plaque', val: car.registrationPlate },
                { icon: <FaCalendarAlt />, label: 'Année', val: car.year },
                { icon: <FaMapMarkerAlt />, label: 'Agence', val: car.agencyName }
            ].map((item, i) => (
                <div key={i} style={{ background: 'var(--card-inline)', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ color: '#f59e0b', fontSize: '18px' }}>{item.icon}</div>
                    <div>
                        <div style={{ fontSize: '13px', color: 'var(--home-desc)', textTransform: 'uppercase' }}>{item.label}</div>
                        <div style={{ fontWeight: '600', fontSize: '16px' }}>{item.val}</div>
                    </div>
                </div>
            ))}
        </div>

        <button 
          onClick={() => navigate(`/booking/${car.id}`)}
          style={{ marginTop: '30px', width: '100%', padding: '15px', background: '#f59e0b', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', color: '#0f172a' }}
        >
          RÉSERVER MAINTENANT
        </button>
      </div>
    </div>
  );
}

export default CarDetails;