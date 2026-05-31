import React, { useState } from 'react';
import { Link } from 'react-router-dom';   
import './Login.css';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulaire soumis', credentials);
    };

    return (
        <div className="clic-auth-bg">
            <div className="clic-auth-overlay">
                <div className="clic-auth-header">
                    <h1>Hi, Welcome to</h1>
                    <span className="clic-brand-logo">Clic & Roule<span>.</span></span>
                </div>

                <div className="clic-auth-card">
                    <form onSubmit={handleSubmit} className="clic-auth-form">
                        <div className="clic-input-wrapper">
                            <span className="clic-input-icon clic-email-icon">✉</span>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email adress"
                                value={credentials.email}
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