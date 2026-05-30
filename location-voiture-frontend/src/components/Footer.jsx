import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <footer style={{
      background: 'var(--card-background)',
      color: 'var(--home-text)',
      borderTop: '1px solid var(--border-color)',
      padding: '60px 10% 30px 10%',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      transition: 'background 0.4s ease, color 0.4s ease'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '40px',
        marginBottom: '40px'
      }}>
        
        <div style={{ flex: '1', minWidth: '250px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '16px', color: 'var(--home-text)' }}>
            Clic & Roule<span style={{ color: '#f59e0b' }}>.</span>
          </h3>
          <p style={{ color: 'var(--home-desc)', fontSize: '14px', lineHeight: '1.6', maxWidth: '300px' }}>
            Solution premium de location de voitures au Maroc. Fiabilité, transparence et service client disponible à chaque étape de votre voyage.
          </p>
        </div>

        <div style={{ flex: '0.5', minWidth: '150px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Navigation
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link to="/" style={{ color: 'var(--home-desc)', textDecoration: 'none', fontSize: '14px' }}>Accueil</Link></li>
            <li><Link to="/cars" style={{ color: 'var(--home-desc)', textDecoration: 'none', fontSize: '14px' }}>Véhicules</Link></li>
            <li><Link to="/login" style={{ color: 'var(--home-desc)', textDecoration: 'none', fontSize: '14px' }}>Connexion</Link></li>
          </ul>
        </div>

        <div style={{ flex: '1', minWidth: '250px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Contact
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--home-desc)', fontSize: '14px' }}>
              <FaMapMarkerAlt color="#f59e0b" size={14} /> BD Hassan II, Mohammedia, Maroc
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--home-desc)', fontSize: '14px' }}>
              <FaPhoneAlt color="#f59e0b" size={14} /> +212 522 123 456
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--home-desc)', fontSize: '14px' }}>
              <FaEnvelope color="#f59e0b" size={14} /> contact@clicandroule.ma
            </li>
          </ul>
        </div>

        <div style={{ flex: '0.8', minWidth: '200px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Suivez-nous
          </h4>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--card-inline)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--home-text)', textDecoration: 'none' }}>
              <FaInstagram size={16} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--card-inline)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--home-text)', textDecoration: 'none' }}>
              <FaFacebookF size={14} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--card-inline)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--home-text)', textDecoration: 'none' }}>
              <FaLinkedinIn size={15} />
            </a>
          </div>
        </div>

      </div>

      <div style={{
        borderTop: '1px solid var(--border-color)',
        paddingTop: '25px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px',
        fontSize: '13px',
        color: 'var(--home-desc)'
      }}>
        <div>
          &copy; 2026 Clic & Roule. Tous droits réservés.
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span style={{ cursor: 'pointer' }}>Mentions légales</span>
          <span style={{ cursor: 'pointer' }}>Politique de confidentialité</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;