import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }
        console.log('Inscription:', formData);
    };

    return (
        <div className="clic-auth-bg">
            <div className="clic-auth-overlay">
                <div className="clic-auth-header">
                    <h1>Join us at</h1>
                    <span className="clic-brand-logo">Clic & Roule<span>.</span></span>
                </div>

                <div className="clic-auth-card">
                    <form onSubmit={handleSubmit} className="clic-auth-form">
                        <div className="clic-input-wrapper">
                            <span className="clic-input-icon">👤</span>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="clic-input-wrapper">
                            <span className="clic-input-icon clic-email-icon">✉</span>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                value={formData.email}
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
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="clic-input-wrapper">
                            <span className="clic-input-icon">🔒</span>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="clic-auth-actions">
                            <button type="submit" className="clic-btn-primary full-width-btn">
                                Create Account
                            </button>
                        </div>
                    </form>

                    <div className="clic-auth-redirect">
                        <p>Already have an account? <Link to="/login">Login here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;