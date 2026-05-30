import React from 'react';
import { Link } from 'react-router-dom';
import carHomeImg from '../assets/car_home.jpg'; 

function Home() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      background: 'var(--home-bg)',
      color: 'var(--home-text)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 10%',
      gap: '60px',
      transition: 'background 0.3s ease, color 0.3s ease',
      fontFamily: 'system-ui, sans-serif'
    }}>
      
      <div style={{ 
        flex: '1',
        maxWidth: '540px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}>
        <div style={{
          background: 'var(--card-inline)',
          padding: '6px 14px',
          borderRadius: '8px',
          fontSize: '12px',
          fontWeight: '700',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          color: '#f59e0b',
          border: '1px solid var(--border-color)',
          marginBottom: '24px'
        }}>
          Service Premium
        </div>

        <h1 style={{
          fontSize: '50px',
          fontWeight: '900',
          lineHeight: '1.15',
          marginBottom: '20px',
          letterSpacing: '-1.5px'
        }}>
          Louez l'excellence <br />en un Clic.
        </h1>

        <p style={{
          fontSize: '17px',
          color: 'var(--home-desc)',
          lineHeight: '1.6',
          marginBottom: '36px'
        }}>
          Simplifiez vos déplacements au Maroc avec une expérience de location fluide, 
          des véhicules sélectionnés et une transparence totale sur les tarifs.
        </p>

        <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
          <Link to="/cars" style={{
            background: '#f59e0b',
            color: '#0f172a',
            padding: '16px 32px',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: '700',
            textDecoration: 'none',
            boxShadow: '0 8px 20px rgba(245, 158, 11, 0.15)'
          }}>
            Explorer le catalogue
          </Link>
          
          <Link to="/login" style={{
            background: 'transparent',
            color: 'var(--home-text)',
            padding: '16px 32px',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: '600',
            textDecoration: 'none',
            border: '2px solid var(--border-color)'
          }}>
            Créer un compte
          </Link>
        </div>
      </div>

      <div style={{
        flex: '1',
        display: 'flex',
        justifyContent: 'flex-end',
        height: '520px',
        maxWidth: '580px'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid var(--border-color)'
        }}>
          <img 
            src={carHomeImg} 
            alt="Sports Car" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      </div>

    </div>
  );
}

export default Home;