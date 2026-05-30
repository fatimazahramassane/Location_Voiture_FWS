import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav style={{
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '15px', 
      borderBottom: '1px solid var(--border-color)',
      backgroundColor: 'var(--card-background)'
    }}>
      <div>
        <strong style={{ color: 'var(--primary-color)', fontSize: '20px' }}>Clic&Roule</strong>
      </div>

      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>Accueil</Link>
        <Link to="/cars" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>Voitures</Link>
        <Link to="/login" style={{ color: 'var(--text-color)', textDecoration: 'none' }}>Connexion</Link>

        <button 
          onClick={toggleTheme} 
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            color: 'var(--text-color)',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {theme === 'light' ? <FaMoon color="#4a5568" /> : <FaSun color="#fbd38d" />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;