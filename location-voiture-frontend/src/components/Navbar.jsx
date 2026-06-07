import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon, FaTachometerAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      const name = localStorage.getItem('username');

      setUser(token ? { role } : null);
      setUsername(name);
    };

    handleAuthChange();
    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
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

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'flex-end', flexGrow: 1 }}>

        {(!user || user.role !== 'ROLE_MANAGER') && (
          <>
            <Link to="/cars" style={{ color: 'var(--home-text)', textDecoration: 'none' }}>Voitures</Link>
            <Link to="/agencies" style={{ color: 'var(--home-text)', textDecoration: 'none' }}>Agences</Link>
          </>
        )}

        {user ? (
          <>
            {/* Dashboard Link */}
            {user.role === 'ROLE_ADMIN' && <Link to="/admin/dashboard" title="Dashboard" style={styles.iconLink}><FaTachometerAlt /></Link>}
            {user.role === 'ROLE_MANAGER' && <Link to="/manager/dashboard" title="Dashboard" style={styles.iconLink}><FaTachometerAlt /></Link>}

            {/* User Profile with Name */}
            <Link to="/profile" style={{ color: 'var(--home-text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}>
              <FaUser />
              <span>{username || 'Profil'}</span>
            </Link>

            {/* Logout Button */}
            <button onClick={handleLogout} title="Déconnexion" style={styles.logoutBtn}>
              <FaSignOutAlt />
            </button>
          </>
        ) : (
          <Link to="/login" title="Connexion" style={{ color: 'var(--home-text)', fontSize: '20px', display: 'flex' }}><FaUser /></Link>
        )}

        {/* Theme Toggle */}
        <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', display: 'flex', color: 'var(--home-text)' }}>
          {theme === 'light' ? <FaMoon /> : <FaSun color="#fbd38d" />}
        </button>
      </div>
    </nav>
  );
}

const styles = {
  iconLink: { color: '#f59e0b', fontSize: '20px', display: 'flex', textDecoration: 'none' },
  logoutBtn: {
    background: 'transparent', border: '1px solid #f59e0b', padding: '6px 10px',
    borderRadius: '8px', cursor: 'pointer', color: '#f59e0b',
    fontSize: '18px', display: 'flex', alignItems: 'center'
  }
};

export default Navbar;