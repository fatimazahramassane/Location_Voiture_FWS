import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaMapMarkerAlt, FaPhone, FaEnvelope, FaListUl } from 'react-icons/fa';

const ManagerDashboard = () => {
  const [agency, setAgency] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const managerId = localStorage.getItem('userId');
    const fetchAgency = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/agencies/manager/${managerId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setAgency(response.data);
      } catch (err) {
        console.error("Erreur :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAgency();
  }, []);

  if (loading) return <div style={styles.center}>Chargement des données...</div>;
  if (!agency) return <div style={styles.center}>Aucune agence associée.</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconHeader}>
          <FaBuilding />
        </div>
        <h1 style={styles.title}>{agency.name}</h1>

        <div style={styles.infoGrid}>
          <div style={styles.infoItem}><FaMapMarkerAlt style={styles.icon} /> <span>{agency.city}, {agency.address}</span></div>
          <div style={styles.infoItem}><FaPhone style={styles.icon} /> <span>{agency.phone}</span></div>
          <div style={styles.infoItem}><FaEnvelope style={styles.icon} /> <span>{agency.email}</span></div>
        </div>

        <button style={styles.button} onClick={() => navigate(`/manager/reservations/${agency.id}`)}>
          <FaListUl style={{ marginRight: '10px' }} />
          Voir les réservations
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '100px 5%', minHeight: '100vh', background: 'var(--background-color)' },
  center: { textAlign: 'center', marginTop: '20%', color: 'var(--text-color)' },
  card: {
    background: 'var(--card-background)', padding: '40px', borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)', maxWidth: '500px', margin: 'auto', textAlign: 'center'
  },
  iconHeader: { fontSize: '40px', color: 'var(--primary-color)', marginBottom: '20px' },
  title: { color: 'var(--text-color)', marginBottom: '5px' },
  subtitle: { color: 'var(--text-color)', opacity: 0.7, marginBottom: '30px' },
  infoGrid: { display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left', marginTop: '20px' },
  infoItem: { display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--text-color)', fontSize: '1rem' },
  icon: { color: 'var(--primary-color)' },
  button: {
    marginTop: '40px', padding: '15px', background: 'var(--primary-color)',
    color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer',
    fontSize: '1rem', fontWeight: 'bold', width: '100%', transition: 'background 0.3s'
  }
};

export default ManagerDashboard;