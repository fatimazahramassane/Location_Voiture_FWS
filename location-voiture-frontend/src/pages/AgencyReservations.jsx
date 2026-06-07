import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaCheck, FaTimes, FaEye, FaCalendarAlt, FaMoneyBillWave, FaCar } from 'react-icons/fa';

const AgencyReservations = () => {
  const { agencyId } = useParams();
  const [reservations, setReservations] = useState([]);
  const [agencyName, setAgencyName] = useState("votre agence");
  const [loading, setLoading] = useState(true);
  const [selectedRes, setSelectedRes] = useState(null);

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };

      const resRes = await axios.get(`http://localhost:8080/api/rentals/agency/${agencyId}`, { headers });
      setReservations(resRes.data);

      const nameRes = await axios.get(`http://localhost:8080/api/agencies/${agencyId}/name`, { headers });
      setAgencyName(nameRes.data);
    } catch (err) {
      console.error("Erreur chargement données", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [agencyId]);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/rentals/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchData();
    } catch (err) { console.error(err); }
  };

  if (loading) return <div style={styles.loading}>Chargement...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gestion des Réservations</h1>
      <p style={styles.subtitle}>
        Consultez et gérez les demandes de location de votre agence :
        <strong style={{ color: 'var(--primary-color)' }}> {agencyName}</strong>.
      </p>

      {reservations.length === 0 ? (
        <div style={styles.empty}>Aucune réservation trouvée pour cette agence.</div>
      ) : (
        <div style={styles.list}>
          {reservations.map(res => (
            <div key={res.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.carInfo}>
                  <div style={styles.carIconContainer}><FaCar style={styles.carIcon} /></div>
                  <div>
                    <div style={styles.carModel}>{res.carBrand} {res.carModel}</div>
                    <div style={styles.clientName}>Client: {res.customerName} | ID: {res.id}</div>
                  </div>
                </div>
                <div style={styles.statusSection}>
                  <div style={{...styles.statusBadge, ...getStatusStyle(res.status)}}>
                    <div style={{...styles.statusDot, background: getStatusColor(res.status)}}></div>
                    {getStatusLabel(res.status)}
                  </div>
                </div>
              </div>

              <div style={styles.cardDetails}>
                <div style={styles.detailItem}>
                  <FaCalendarAlt style={styles.detailIcon} />
                  <div>
                    <div style={styles.detailLabel}>DEBUT</div>
                    <div style={styles.detailValue}>{res.startDate}</div>
                  </div>
                </div>
                <div style={styles.detailItem}>
                  <FaCalendarAlt style={styles.detailIcon} />
                  <div>
                    <div style={styles.detailLabel}>FIN</div>
                    <div style={styles.detailValue}>{res.endDate}</div>
                  </div>
                </div>
                <div style={styles.detailItem}>
                  <FaMoneyBillWave style={styles.priceIcon} />
                  <div>
                    <div style={styles.detailLabel}>COÛT TOTAL</div>
                    <div style={styles.priceValue}>{res.totalCost} DH</div>
                  </div>
                </div>
              </div>

              <div style={styles.actionRow}>
                <button onClick={() => setSelectedRes(res)} style={styles.eyeBtn} title="Voir les détails">
                  <FaEye />
                </button>
                {res.status === 'PENDING' && (
                  <>
                    <button onClick={() => updateStatus(res.id, 'ACTIVE')} style={styles.checkBtn} title="Accepter">
                      <FaCheck />
                    </button>
                    <button onClick={() => updateStatus(res.id, 'CANCELLED')} style={styles.timesBtn} title="Refuser">
                      <FaTimes />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedRes && (
        <div style={styles.modalOverlay} onClick={() => setSelectedRes(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <h2 style={{ color: 'var(--text-color)' }}>Détails de la réservation</h2>
            <div style={styles.grid}>
              <p><strong>Email:</strong> {selectedRes.customerEmail || 'Non fourni'}</p>
              <p><strong>Téléphone:</strong> {selectedRes.customerPhone || 'Non fourni'}</p>
              <p><strong>Permis:</strong> {selectedRes.customerLicenseNumber || 'Non fourni'}</p>
              <p><strong>Dates:</strong> {selectedRes.startDate} à {selectedRes.endDate}</p>
              <p><strong>Total:</strong> {selectedRes.totalCost} MAD</p>
              <p><strong>Notes:</strong> {selectedRes.notes || "Aucune"}</p>
            </div>
            <button onClick={() => setSelectedRes(null)} style={styles.closeBtn}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '80px 10%', background: 'var(--background-color)', minHeight: '100vh', color: 'var(--text-color)' },
  title: { color: 'var(--text-color)', fontSize: '32px', marginBottom: '10px' },
  subtitle: { color: 'var(--text-color)', fontSize: '16px', marginBottom: '40px', opacity: 0.8 },
  loading: { textAlign: 'center', marginTop: '100px', fontSize: '18px', color: 'var(--text-color)' },
  empty: { textAlign: 'center', marginTop: '50px', fontSize: '18px', color: 'var(--text-color)', background: 'var(--card-background)', padding: '30px', borderRadius: '12px' },
  list: { display: 'flex', flexDirection: 'column', gap: '20px' },
  card: { background: 'var(--card-background)', borderRadius: '20px', padding: '25px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  carInfo: { display: 'flex', alignItems: 'center', gap: '15px' },
  carIconContainer: { background: 'var(--primary-color)', color: '#fff', padding: '12px', borderRadius: '12px', display: 'flex' },
  carModel: { color: 'var(--text-color)', fontSize: '20px', fontWeight: 'bold' },
  clientName: { color: 'var(--text-color)', fontSize: '14px', opacity: 0.7 },
  statusBadge: { display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 15px', borderRadius: '20px', fontSize: '14px', fontWeight: '500' },
  statusDot: { width: '8px', height: '8px', borderRadius: '50%' },
  cardDetails: { display: 'flex', justifyContent: 'space-around', gap: '20px', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '20px 0', marginBottom: '20px' },
  detailItem: { display: 'flex', alignItems: 'center', gap: '10px' },
  detailIcon: { fontSize: '18px', color: 'var(--primary-color)' },
  priceIcon: { fontSize: '18px', color: 'var(--primary-color)' },
  detailLabel: { fontSize: '11px', color: 'var(--text-color)', opacity: 0.6, textTransform: 'uppercase' },
  detailValue: { fontSize: '16px', color: 'var(--text-color)', fontWeight: '500' },
  priceValue: { fontSize: '18px', color: 'var(--primary-color)', fontWeight: 'bold' },
  actionRow: { display: 'flex', justifyContent: 'flex-end', gap: '10px' },
  eyeBtn: { background: 'var(--card-background)', border: '1px solid var(--border-color)', color: 'var(--text-color)', padding: '10px', borderRadius: '8px', cursor: 'pointer' },
  checkBtn: { background: '#E8F5E9', color: '#43A047', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer' },
  timesBtn: { background: '#FFEBEE', color: '#E53935', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: 'var(--background-color)', padding: '30px', borderRadius: '15px', width: '400px', border: '1px solid var(--border-color)' },
  grid: { display: 'grid', gap: '10px', marginTop: '20px' },
  closeBtn: { marginTop: '20px', padding: '10px 20px', background: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }
};

const getStatusColor = (status) => ({ 'ACTIVE': '#2ecc71', 'PENDING': '#f1c40f', 'COMPLETED': '#3498db', 'CANCELLED': '#e74c3c' }[status] || '#95a5a6');
const getStatusStyle = (status) => ({ color: getStatusColor(status), background: getStatusColor(status) + '15' });
const getStatusLabel = (status) => ({ 'ACTIVE': 'Active', 'PENDING': 'En attente', 'COMPLETED': 'Terminée', 'CANCELLED': 'Annulée' }[status] || status);

export default AgencyReservations;