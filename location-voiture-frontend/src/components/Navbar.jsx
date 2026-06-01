import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      setUser(token ? { role } : null);
    };

    handleAuthChange();

    window.addEventListener('authChange', handleAuthChange);
    
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    // إرسال إشارة للـ Navbar لتحديث الحالة
    window.dispatchEvent(new Event('authChange'));
    
    window.location.href = '/login';
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '60px',
      zIndex: 1000,
      background: 'var(--card-background)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 5%',
      boxSizing: 'border-box',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
    }}>
      <div>
        <strong style={{ fontSize: '20px' }}>
          <Link to="/" style={{ color: 'var(--home-text)', textDecoration: 'none' }}>Clic&Roule</Link>
        </strong>
      </div>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/cars" style={{ color: 'var(--home-text)', textDecoration: 'none' }}>Voitures</Link>
        <Link to="/agencies" style={{ color: 'var(--home-text)', textDecoration: 'none' }}>Agences</Link>

        {user ? (
          <>
            {user.role === 'ROLE_ADMIN' && (
              <Link to="/admin/dashboard" style={{ color: '#f59e0b', fontWeight: 'bold' }}>Dashboard</Link>
            )}
            {user.role === 'ROLE_USER' && (
              <Link to="/my-rentals" style={{ color: 'var(--home-text)', textDecoration: 'none' }}>Réservations</Link>
            )}
            <button 
              onClick={handleLogout} 
              style={{ background: 'transparent', border: '1px solid #f59e0b', padding: '5px 10px', borderRadius: '8px', cursor: 'pointer', color: 'var(--home-text)' }}
            >
              Déconnexion
            </button>
          </>
        ) : (
          <Link to="/login" style={{ color: 'var(--home-text)', textDecoration: 'none' }}>Connexion</Link>
        )}

        <button 
          onClick={toggleTheme} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', display: 'flex' }}
        >
          {theme === 'light' ? <FaMoon color="#4a5568" /> : <FaSun color="#fbd38d" />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;