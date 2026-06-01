import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon, FaTachometerAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

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

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('agencyName');
    window.dispatchEvent(new Event('authChange'));
    window.location.href = '/login';
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '60px', zIndex: 1000,
      background: 'var(--card-background)', borderBottom: '1px solid var(--border-color)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
      padding: '0 5%', boxSizing: 'border-box'
    }}>
      <strong style={{ flexShrink: 0, fontSize: '20px' }}>
        <Link to="/" style={{ color: 'var(--home-text)', textDecoration: 'none' }}>Clic&Roule</Link>
      </strong>
      
      <div style={{ 
        display: 'flex', gap: '25px', alignItems: 'center', 
        justifyContent: 'flex-end', flexGrow: 1 
      }}>
        
        {(!user || user.role !== 'ROLE_MANAGER') && (
          <>
            <Link to="/cars" style={{ color: 'var(--home-text)', textDecoration: 'none', whiteSpace: 'nowrap' }}>Voitures</Link>
            <Link to="/agencies" style={{ color: 'var(--home-text)', textDecoration: 'none', whiteSpace: 'nowrap' }}>Agences</Link>
          </>
        )}

        {user ? (
          <>
            {user.role === 'ROLE_ADMIN' && (
              <Link to="/admin/dashboard" title="Dashboard" style={{ color: '#f59e0b', fontSize: '20px', display: 'flex' }}><FaTachometerAlt /></Link>
            )}
            {user.role === 'ROLE_MANAGER' && (
              <Link to="/manager/dashboard" title="Dashboard" style={{ color: '#f59e0b', fontSize: '20px', display: 'flex' }}><FaTachometerAlt /></Link>
            )}
            {user.role === 'ROLE_USER' && (
              <Link to="/my-rentals" title="Réservations" style={{ color: 'var(--home-text)', fontSize: '20px', display: 'flex' }}><FaTachometerAlt /></Link>
            )}
            
            {/* Profile Link */}
            <Link to="/profile" title="Mon Profil" style={{ color: 'var(--home-text)', fontSize: '20px', display: 'flex' }}>
              <FaUser />
            </Link>
            
            {/* Logout Button */}
            <button onClick={handleLogout} title="Déconnexion" style={{ 
              background: 'transparent', border: '1px solid #f59e0b', padding: '6px 10px', 
              borderRadius: '8px', cursor: 'pointer', color: 'var(--home-text)', 
              fontSize: '18px', display: 'flex', alignItems: 'center'
            }}>
              <FaSignOutAlt />
            </button>
          </>
        ) : (
          <Link to="/login" title="Connexion" style={{ color: 'var(--home-text)', fontSize: '20px', display: 'flex' }}><FaUser /></Link>
        )}

        {/* Theme Toggle */}
        <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', display: 'flex' }}>
          {theme === 'light' ? <FaMoon color="#4a5568" /> : <FaSun color="#fbd38d" />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;