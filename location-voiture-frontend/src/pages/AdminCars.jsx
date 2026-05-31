import React, { useState, useEffect } from 'react';
import { FaTrash, FaPlus, FaTimes, FaEdit } from 'react-icons/fa';
import './AdminCars.css';

function AdminCars() {
  const [cars, setCars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCarId, setEditingCarId] = useState(null);
  const [formData, setFormData] = useState({ brand: '', model: '', year: '', registrationPlate: '', dailyRate: '' });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    fetch('http://localhost:8080/api/cars', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(data => setCars(data))
    .catch(err => console.error("Erreur chargement:", err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingCarId ? 'PUT' : 'POST';
    const url = editingCarId ? `http://localhost:8080/api/cars/${editingCarId}` : 'http://localhost:8080/api/cars';
    
    await fetch(url, {
      method: method,
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(formData)
    });
    setIsModalOpen(false);
    setEditingCarId(null);
    setFormData({ brand: '', model: '', year: '', registrationPlate: '', dailyRate: '' });
    fetchCars(); 
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette voiture ?")) return;
    
    await fetch(`http://localhost:8080/api/cars/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    fetchCars();
  };

  return (
    <div className="admin-page">
      <div className="top-bar">
        <h1>Gestion du Parc</h1>
        <button className="btn-add" onClick={() => { setEditingCarId(null); setFormData({}); setIsModalOpen(true); }}>
            <FaPlus /> Nouvelle Voiture
        </button>
      </div>

      {isModalOpen && (
        <div className="overlay">
          <form onSubmit={handleSubmit} className="modal">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h3>{editingCarId ? 'Modifier' : 'Ajouter'} Véhicule</h3>
              <FaTimes onClick={() => setIsModalOpen(false)} style={{ cursor: 'pointer' }} />
            </div>
            <input className="input-field" value={formData.brand || ''} placeholder="Marque" onChange={(e) => setFormData({...formData, brand: e.target.value})} required />
            <input className="input-field" value={formData.model || ''} placeholder="Modèle" onChange={(e) => setFormData({...formData, model: e.target.value})} required />
            <input className="input-field" type="number" value={formData.year || ''} placeholder="Année" onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})} required />
            <input className="input-field" value={formData.registrationPlate || ''} placeholder="Matricule" onChange={(e) => setFormData({...formData, registrationPlate: e.target.value})} required />
            <input className="input-field" type="number" value={formData.dailyRate || ''} placeholder="Prix par jour" onChange={(e) => setFormData({...formData, dailyRate: parseFloat(e.target.value)})} required />
            <button type="submit" className="btn-add">{editingCarId ? 'Mettre à jour' : 'Enregistrer'}</button>
          </form>
        </div>
      )}

      <div className="table-wrapper">
        <table className="styled-table">
          <thead><tr><th>Marque</th><th>Modèle</th><th>Prix/Jour</th><th>Actions</th></tr></thead>
          <tbody>
            {cars.slice(0,22).map(car => (
              <tr key={car.id}>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.dailyRate} DH</td>
                <td>
                  <button onClick={() => { setEditingCarId(car.id); setFormData(car); setIsModalOpen(true); }} style={{background:'none', border:'none', marginRight:'15px', color:'blue', cursor:'pointer'}}><FaEdit /></button>
                  <button onClick={() => handleDelete(car.id)} className="btn-del"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCars;