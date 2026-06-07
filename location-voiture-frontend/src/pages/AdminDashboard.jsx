import React, { useState, useEffect } from 'react';
import { FaCar, FaClipboardList, FaPlus, FaTrash, FaCheck, FaTimes, FaEdit } from 'react-icons/fa';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('cars');
  const [cars, setCars] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);

  const [newCar, setNewCar] = useState({
    brand: '', model: '', year: 2026, dailyRate: '',
    fuelType: 'GASOLINE', transmission: 'AUTOMATIC', status: 'AVAILABLE',
    registrationPlate: '', mileage: '', vin: '', color: '',
    numberOfDoors: 4, numberOfSeats: 5, hasAirConditioning: true, hasGPS: true
  });

  const fetchData = async () => {
    const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
    try {
      const [carsRes, rentalsRes] = await Promise.all([
        fetch('http://localhost:8080/api/cars', { headers }),
        fetch('http://localhost:8080/api/rentals', { headers })
      ]);
      if (carsRes.ok) setCars(await carsRes.json());
      if (rentalsRes.ok) setRentals(await rentalsRes.json());
    } catch (err) {
      console.error("Erreur API:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddCar = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8080/api/cars', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCar)
    });
    setNewCar({ brand: '', model: '', year: 2026, dailyRate: '', fuelType: 'GASOLINE', transmission: 'AUTOMATIC', status: 'AVAILABLE', registrationPlate: '', mileage: '', vin: '', color: '', numberOfDoors: 4, numberOfSeats: 5, hasAirConditioning: true, hasGPS: true });
    fetchData();
  };

  const handleDeleteCar = async (id) => {
    await fetch(`http://localhost:8080/api/cars/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    fetchData();
  };

  const handleEditClick = (car) => {
    setEditingCar({ ...car });
    setIsEditModalOpen(true);
  };

  const handleUpdateCar = async (e) => {
    e.preventDefault();
    if (!editingCar) return;
    await fetch(`http://localhost:8080/api/cars/${editingCar.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editingCar)
    });
    setIsEditModalOpen(false);
    setEditingCar(null);
    fetchData();
  };

  const handleUpdateRentalStatus = async (rentalId, newStatus) => {
    await fetch(`http://localhost:8080/api/rentals/${rentalId}/status`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    });
    fetchData();
  };


  const renderCarFormFields = (carData, setCarData, isEdit = false) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <input type="text" placeholder="Marque" required value={carData.brand} onChange={e => setCarData({...carData, brand: e.target.value})} style={{ padding: '12px', borderRadius: '8px', background: 'var(--card-inline)', border: '1px solid var(--border-color)', color: 'var(--home-text)' }} />
      <input type="text" placeholder="Modèle" required value={carData.model} onChange={e => setCarData({...carData, model: e.target.value})} style={{ padding: '12px', borderRadius: '8px', background: 'var(--card-inline)', border: '1px solid var(--border-color)', color: 'var(--home-text)' }} />
      <input type="number" placeholder="Année" required value={carData.year} onChange={e => setCarData({...carData, year: e.target.value})} style={{ padding: '12px', borderRadius: '8px', background: 'var(--card-inline)', border: '1px solid var(--border-color)', color: 'var(--home-text)' }} />
      <input type="text" placeholder="Numéro VIN" required value={carData.vin} onChange={e => setCarData({...carData, vin: e.target.value})} style={{ padding: '12px', borderRadius: '8px', background: 'var(--card-inline)', border: '1px solid var(--border-color)', color: 'var(--home-text)' }} />
      <input type="text" placeholder="Immatriculation" required value={carData.registrationPlate} onChange={e => setCarData({...carData, registrationPlate: e.target.value})} style={{ padding: '12px', borderRadius: '8px', background: 'var(--card-inline)', border: '1px solid var(--border-color)', color: 'var(--home-text)' }} />
      <input type="number" placeholder="Kilométrage" required value={carData.mileage} onChange={e => setCarData({...carData, mileage: e.target.value})} style={{ padding: '12px', borderRadius: '8px', background: 'var(--card-inline)', border: '1px solid var(--border-color)', color: 'var(--home-text)' }} />
      <input type="number" placeholder="Prix par jour (DH)" required value={carData.dailyRate} onChange={e => setCarData({...carData, dailyRate: e.target.value})} style={{ padding: '12px', borderRadius: '8px', background: 'var(--card-inline)', border: '1px solid var(--border-color)', color: 'var(--home-text)' }} />
      <input type="text" placeholder="Couleur" required value={carData.color} onChange={e => setCarData({...carData, color: e.target.value})} style={{ padding: '12px', borderRadius: '8px', background: 'var(--card-inline)', border: '1px solid var(--border-color)', color: 'var(--home-text)' }} />

      <select value={carData.fuelType} onChange={e => setCarData({...carData, fuelType: e.target.value})} style={{ padding: '12px', borderRadius: '8px', background: 'var(--card-inline)', border: '1px solid var(--border-color)', color: 'var(--home-text)' }}>
        <option value="GASOLINE">Gasoline</option>
        <option value="DIESEL">Diesel</option>
        <option value="ELECTRIC">Electric</option>
        <option value="HYBRID">Hybrid</option>
      </select>

      <select value={carData.transmission} onChange={e => setCarData({...carData, transmission: e.target.value})} style={{ padding: '12px', borderRadius: '8px', background: 'var(--card-inline)', border: '1px solid var(--border-color)', color: 'var(--home-text)' }}>
        <option value="MANUAL">Manuelle</option>
        <option value="AUTOMATIC">Automatique</option>
      </select>

      <select value={carData.status} onChange={e => setCarData({...carData, status: e.target.value})} style={{ padding: '12px', borderRadius: '8px', background: 'var(--card-inline)', border: '1px solid var(--border-color)', color: 'var(--home-text)' }}>
        <option value="AVAILABLE">AVAILABLE</option>
        <option value="RENTED">RENTED</option>
        <option value="MAINTENANCE">MAINTENANCE</option>
        <option value="OUT_OF_SERVICE">OUT_OF_SERVICE</option>
      </select>

      {!isEdit && (
        <button type="submit" style={{ background: '#f59e0b', color: '#0f172a', padding: '14px', borderRadius: '10px', border: 'none', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <FaPlus /> Ajouter à la flotte
        </button>
      )}
    </div>
  );

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
        <h1 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '10px' }}>
          Pilotez votre flotte
        </h1>
        <p style={{ color: 'var(--home-desc)', margin: 0 }}>
          Gestion de la flotte de véhicules, des agences et approbation des contrats de location.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        <button
          onClick={() => setActiveTab('cars')}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px',
            border: '1px solid var(--border-color)', fontWeight: '700', cursor: 'pointer',
            background: activeTab === 'cars' ? '#f59e0b' : 'var(--card-background)',
            color: activeTab === 'cars' ? '#0f172a' : 'var(--home-text)'
          }}
        >
          <FaCar /> Gestion Flotte ({cars.length})
        </button>
        <button
          onClick={() => setActiveTab('rentals')}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px',
            border: '1px solid var(--border-color)', fontWeight: '700', cursor: 'pointer',
            background: activeTab === 'rentals' ? '#f59e0b' : 'var(--card-background)',
            color: activeTab === 'rentals' ? '#0f172a' : 'var(--home-text)'
          }}
        >
          <FaClipboardList /> Réservations Globales ({rentals.length})
        </button>
      </div>

      {activeTab === 'cars' && (
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          <form onSubmit={handleAddCar} style={{
            flex: '1', minWidth: '300px', background: 'var(--card-background)',
            border: '1px solid var(--border-color)', borderRadius: '24px', padding: '30px', height: 'fit-content'
          }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '800' }}>Ajouter un véhicule</h3>
            {renderCarFormFields(newCar, setNewCar, false)}
          </form>

          <div style={{ flex: '2', minWidth: '500px', background: 'var(--card-background)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '30px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--home-desc)', fontSize: '14px' }}>
                  <th style={{ paddingBottom: '12px' }}>Véhicule</th>
                  <th style={{ paddingBottom: '12px' }}>Immatriculation</th>
                  <th style={{ paddingBottom: '12px' }}>Prix/J</th>
                  <th style={{ paddingBottom: '12px' }}>Statut</th>
                  <th style={{ paddingBottom: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.slice(0,22).map(car => (
                  <tr key={car.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '16px 0', fontWeight: '700' }}>{car.brand} {car.model} ({car.year})</td>
                    <td style={{ padding: '16px 0' }}>{car.registrationPlate}</td>
                    <td style={{ padding: '16px 0', fontWeight: '700' }}>{car.dailyRate} DH</td>
                    <td style={{ padding: '16px 0' }}>
                      <span style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '6px', fontWeight: '700', background: car.status === 'AVAILABLE' ? '#10b98120' : '#ef444420', color: car.status === 'AVAILABLE' ? '#10b981' : '#ef4444' }}>
                        {car.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 0', display: 'flex', gap: '10px' }}>
                      <button onClick={() => handleEditClick(car)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer' }}>
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDeleteCar(car.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'rentals' && (
        <div style={{ background: 'var(--card-background)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '30px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--home-desc)', fontSize: '14px' }}>
                <th style={{ paddingBottom: '12px' }}>ID</th>
                <th style={{ paddingBottom: '12px' }}>Véhicule</th>
                <th style={{ paddingBottom: '12px' }}>Dates</th>
                <th style={{ paddingBottom: '12px' }}>Coût</th>
                <th style={{ paddingBottom: '12px' }}>Statut actuel</th>
                <th style={{ paddingBottom: '12px' }}>Actions d'approbation</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map(rental => (
                <tr key={rental.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 0' }}>#{rental.id}</td>
                  <td style={{ padding: '16px 0', fontWeight: '700' }}>{rental.carBrand} {rental.carModel}</td>
                  <td style={{ padding: '16px 0', fontSize: '14px' }}>{rental.startDate} au {rental.endDate}</td>
                  <td style={{ padding: '16px 0', fontWeight: '700', color: '#f59e0b' }}>{rental.totalCost} DH</td>
                  <td style={{ padding: '16px 0' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: rental.status === 'PENDING' ? '#f59e0b' : rental.status === 'ACTIVE' ? '#3b82f6' : rental.status === 'COMPLETED' ? '#10b981' : '#ef4444' }}>
                      {rental.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 0', display: 'flex', gap: '10px' }}>
                    {rental.status === 'PENDING' && (
                      <>
                        <button onClick={() => handleUpdateRentalStatus(rental.id, 'ACTIVE')} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '700' }}>
                          <FaCheck /> Activer
                        </button>
                        <button onClick={() => handleUpdateRentalStatus(rental.id, 'CANCELLED')} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '700' }}>
                          <FaTimes /> Annuler
                        </button>
                      </>
                    )}
                    {rental.status === 'ACTIVE' && (
                      <button onClick={() => handleUpdateRentalStatus(rental.id, 'COMPLETED')} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}>
                        Clôturer le retour
                      </button>
                    )}
                    {rental.status !== 'PENDING' && rental.status !== 'ACTIVE' && (
                      <span style={{ color: 'var(--home-desc)', fontSize: '13px' }}>Aucune action</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isEditModalOpen && editingCar && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'var(--card-background)', borderRadius: '24px', padding: '30px',
            width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: '800' }}>Modifier le véhicule</h3>
            <form onSubmit={handleUpdateCar}>
              {renderCarFormFields(editingCar, setEditingCar, true)}
              <div style={{ display: 'flex', gap: '15px', marginTop: '25px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setIsEditModalOpen(false)} style={{
                  padding: '12px 20px', borderRadius: '10px', border: '1px solid var(--border-color)',
                  background: 'transparent', color: 'var(--home-text)', cursor: 'pointer', fontWeight: '700'
                }}>
                  Annuler
                </button>
                <button type="submit" style={{
                  background: '#f59e0b', color: '#0f172a', padding: '12px 20px', borderRadius: '10px',
                  border: 'none', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
                }}>
                  <FaCheck /> Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;