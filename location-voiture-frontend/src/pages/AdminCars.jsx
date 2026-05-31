import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

function AdminCars() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/cars', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(data => setCars(data))
    .catch(err => console.error("Erreur:", err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette voiture ?")) return;
    
    await fetch(`http://localhost:8080/api/cars/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    setCars(cars.filter(car => car.id !== id));
  };

  return (
    <div style={{ padding: '40px', background: 'var(--home-bg)', minHeight: '100vh', color: 'var(--home-text)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Gestion du Parc</h1>
        <button style={{ padding: '10px 20px', background: '#10b981', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>
          <FaPlus /> Ajouter Voiture
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--card-background)', borderRadius: '12px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ background: 'var(--card-inline)', textAlign: 'left' }}>
            <th style={{ padding: '15px' }}>Marque</th>
            <th style={{ padding: '15px' }}>Modèle</th>
            <th style={{ padding: '15px' }}>Matricule</th>
            <th style={{ padding: '15px' }}>Prix/Jour</th>
            <th style={{ padding: '15px' }}>Statut</th>
            <th style={{ padding: '15px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '15px' }}>{car.brand}</td>
              <td style={{ padding: '15px' }}>{car.model}</td>
              <td style={{ padding: '15px' }}>{car.registrationPlate}</td>
              <td style={{ padding: '15px' }}>{car.dailyRate} DH</td>
              <td style={{ padding: '15px' }}>{car.status}</td>
              <td style={{ padding: '15px' }}>
                <button style={{ marginRight: '10px', background: 'none', border: 'none', cursor: 'pointer' }}><FaEdit /></button>
                <button onClick={() => handleDelete(car.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminCars;