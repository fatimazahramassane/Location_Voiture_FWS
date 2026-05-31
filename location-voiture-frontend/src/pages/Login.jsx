import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Authentication failed');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('role', data.role);

            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="clic-auth-bg">
            <div className="clic-auth-overlay">
                <div className="clic-auth-header">
                    <h1>Hi, Welcome to</h1>
                    <span className="clic-brand-logo">Clic & Roule<span>.</span></span>
                </div>

                <div className="clic-auth-card">
                    {error && <div className="error-message" style={{color: '#ff4d4d', marginBottom: '15px', fontSize: '14px'}}>{error}</div>}
                    
                    <form onSubmit={handleSubmit} className="clic-auth-form">
                        <div className="clic-input-wrapper">
                            <span className="clic-input-icon">👤</span>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={credentials.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="clic-input-wrapper">
                            <span className="clic-input-icon">🔑</span>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="clic-auth-actions">
                            <button type="submit" className="clic-btn-primary full-width-btn">
                                Engine
                            </button>
                        </div>
                    </form>

                    <div className="clic-auth-redirect">
                        <p>Don't have an account? <Link to="/register">Register here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;