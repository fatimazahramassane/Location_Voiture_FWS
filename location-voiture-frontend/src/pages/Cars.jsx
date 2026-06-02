import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaGasPump, FaCogs } from 'react-icons/fa';

function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const agencyId = searchParams.get('agencyId');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('ALL');
  const [selectedTransmission, setSelectedTransmission] = useState('ALL');
  const [maxPrice, setMaxPrice] = useState(1000);

  const images = import.meta.glob('../assets/cars/*.jpg', { eager: true });

  const getCarImage = (brand, index) => {
    const fileName = `../assets/cars/${brand.toLowerCase()}_${index + 1}.jpg`;
    if (images[fileName]) return images[fileName].default;
    return '/assets/cars/default.jpg';
  };

  useEffect(() => {
    const url = agencyId 
      ? `http://localhost:8080/api/agencies/${agencyId}/cars` 
      : 'http://localhost:8080/api/cars';
      
    fetch(url, {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      setCars(data);
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, [agencyId]);

  const filteredCars = cars.filter((car) => {
    const matchesSearch = car.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          car.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFuel = selectedFuel === 'ALL' || car.fuelType === selectedFuel;
    const matchesTransmission = selectedTransmission === 'ALL' || car.transmission === selectedTransmission;
    const matchesPrice = car.dailyRate <= maxPrice;
    return matchesSearch && matchesFuel && matchesTransmission && matchesPrice;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--home-bg)', color: 'var(--home-text)', padding: '120px 10% 60px 10%', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '10px' }}>Notre Flotte</h1>
        <p style={{ color: 'var(--home-desc)' }}>Recherchez et filtrez nos véhicules disponibles.</p>
      </div>

      <div style={{ background: 'var(--card-background)', padding: '30px', borderRadius: '24px', marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <input type="text" placeholder="Rechercher par marque ou modèle..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)', background: 'var(--card-inline)', color: 'var(--home-text)' }} />
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <select value={selectedFuel} onChange={(e) => setSelectedFuel(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '12px', background: 'var(--card-inline)', color: 'var(--home-text)' }}>
            <option value="ALL">Tous les carburants</option>
            <option value="GASOLINE">Gasoline</option>
            <option value="DIESEL">Diesel</option>
            <option value="HYBRID">Hybrid</option>
            <option value="ELECTRIC">Electric</option>
          </select>
          <select value={selectedTransmission} onChange={(e) => setSelectedTransmission(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '12px', background: 'var(--card-inline)', color: 'var(--home-text)' }}>
            <option value="ALL">Toutes les boîtes</option>
            <option value="MANUAL">Manuelle</option>
            <option value="AUTOMATIC">Automatique</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Chargement en cours...</p>
      ) : filteredCars.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: 'var(--card-background)', borderRadius: '24px', border: '1px solid var(--border-color)', color: 'var(--home-desc)' }}>
          <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Aucun véhicule trouvé</h3>
        </div>
      ) : (
        agencyId ? (
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {filteredCars.map((car) => (
              <div key={car.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: 'var(--card-background)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0' }}>{car.brand} {car.model}</h3>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--home-desc)' }}>{car.fuelType} • {car.transmission}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span style={{ fontWeight: 'bold' }}>{car.dailyRate} DH / jour</span>
                  <Link to={`/car-details/${car.id}`} style={{ background: '#f59e0b', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', color: '#0f172a', fontWeight: '700' }}>Détails</Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {filteredCars.slice(0, 20).map((car, index) => (
              <div key={car.id} style={{ background: 'var(--card-background)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '220px' }}>
                  <img src={getCarImage(car.brand, index)} alt={car.model} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '25px', flexGrow: '1', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '13px', color: '#f59e0b', fontWeight: '700' }}>{car.brand}</span>
                  <h3 style={{ fontSize: '22px', margin: '0 0 10px 0', color: 'var(--home-text)' }}>{car.model}</h3>
                  <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', color: 'var(--home-desc)' }}>
                    <span><FaGasPump /> {car.fuelType}</span>
                    <span><FaCogs /> {car.transmission}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--home-text)' }}>{car.dailyRate} DH / jour</span>
                    <Link to={`/car-details/${car.id}`} style={{ background: '#f59e0b', padding: '10px 20px', borderRadius: '12px', textDecoration: 'none', color: '#0f172a', fontWeight: '700' }}>Détails</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default Cars;
