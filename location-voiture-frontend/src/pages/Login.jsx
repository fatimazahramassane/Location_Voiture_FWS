import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), 
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Identifiants incorrects');
            }

            setSuccess('Connexion réussie !');

            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('role', data.role);

            setTimeout(() => {
                if (data.role === 'ADMIN' || data.role === 'ROLE_ADMIN') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/cars');
                }
            }, 1500);

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="clic-auth-bg">
            <div className="clic-auth-overlay">
                <div className="clic-auth-header">
                    <h1>Welcome back to</h1>
                    <span className="clic-brand-logo">Clic & Roule<span>.</span></span>
                </div>

                <div className="clic-auth-card">
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    
                    <form onSubmit={handleSubmit} className="clic-auth-form-single">
                        <div className="clic-input-wrapper">
                            <span className="clic-input-icon">👤</span>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="clic-input-wrapper" style={{ marginTop: '16px' }}>
                            <span className="clic-input-icon">🔑</span>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="clic-auth-actions" style={{ marginTop: '24px' }}>
                            <button type="submit" className="clic-btn-primary full-width-btn">
                                Login
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