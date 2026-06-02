import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [user, setUser] = useState({
        username: '', email: '', firstName: '', lastName: '', password: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/users/profile', {
                    headers: { 
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json' 
                    }
                });
                
                if (!response.ok) {
                    throw new Error("Impossible de charger le profil. Vérifiez que le serveur est démarré.");
                }
                
                const data = await response.json();
                setUser({ ...data, password: '' });
            } catch (err) {
                console.error("Error fetching profile", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                alert("Profil mis à jour avec succès !");
            } else {
                alert("Erreur lors de la mise à jour");
            }
        } catch (err) {
            console.error(err);
            alert("Erreur de connexion au serveur");
        }
    };

    if (loading) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Chargement...</div>;
    
    if (error) return <div style={{ paddingTop: '100px', textAlign: 'center', color: 'red' }}>{error}</div>;

    const inputStyle = {
        width: '100%', padding: '12px', margin: '8px 0', borderRadius: '8px',
        border: '1px solid var(--border-color)', background: 'var(--card-background)',
        color: 'var(--home-text)', boxSizing: 'border-box'
    };

    return (
        <div style={{ paddingTop: '100px', display: 'flex', justifyContent: 'center', paddingBottom: '50px' }}>
            <div style={{
                background: 'var(--card-background)', padding: '40px', borderRadius: '20px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '90%', maxWidth: '500px',
                border: '1px solid var(--border-color)'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Mon Profil</h2>
                
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input name="username" value={user.username} style={{...inputStyle, opacity: 0.7}} readOnly />
                    
                    <label>Prénom</label>
                    <input name="firstName" value={user.firstName} onChange={handleChange} style={inputStyle} />
                    
                    <label>Nom</label>
                    <input name="lastName" value={user.lastName} onChange={handleChange} style={inputStyle} />
                    
                    <label>Email</label>
                    <input name="email" value={user.email} onChange={handleChange} style={inputStyle} />
                    
                    <label>Nouveau mot de passe</label>
                    <input type="password" name="password" placeholder="********" onChange={handleChange} style={inputStyle} />

                    <button type="submit" style={{
                        width: '100%', padding: '15px', marginTop: '20px', borderRadius: '8px',
                        border: 'none', background: '#f59e0b', color: 'white', fontWeight: 'bold', cursor: 'pointer'
                    }}>
                        Enregistrer les modifications
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;