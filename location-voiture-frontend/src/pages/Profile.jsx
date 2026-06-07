import React, { useState, useEffect } from 'react';
import { FaUserEdit, FaSave } from 'react-icons/fa';

const Profile = () => {
    const [user, setUser] = useState({
        username: '', email: '', firstName: '', lastName: '', password: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/users/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) throw new Error("Impossible de charger le profil.");
                const data = await response.json();
                setUser({ ...data, password: '' });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage({ text: '', type: '' });

        const userDataToUpdate = { ...user };
        if (!userDataToUpdate.password || userDataToUpdate.password.trim() === "") {
            delete userDataToUpdate.password;
        }

        try {
            const response = await fetch('http://localhost:8080/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(userDataToUpdate)
            });

            if (response.ok) {
                setStatusMessage({ text: "Profil mis à jour avec succès ! ", type: 'success' });
                setUser(prev => ({ ...prev, password: '' }));
            } else {
                setStatusMessage({ text: "Une erreur est survenue, veuillez réessayer.", type: 'error' });
            }
        } catch (err) {
            setStatusMessage({ text: "Problème de connexion au serveur.", type: 'error' });
        }
    };

    if (loading) return <div style={styles.center}>Chargement en cours...</div>;
    if (error) return <div style={styles.center}>Erreur : {error}</div>;

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <FaUserEdit size={40} color="#f59e0b" />
                    <h2 style={styles.title}>Mon Profil</h2>
                </div>

                {statusMessage.text && (
                    <div style={{
                        padding: '12px', marginBottom: '20px', borderRadius: '12px', textAlign: 'center',
                        background: statusMessage.type === 'success' ? '#dcfce7' : '#fee2e2',
                        color: statusMessage.type === 'success' ? '#166534' : '#991b1b',
                        fontWeight: '500'
                    }}>
                        {statusMessage.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.field}>
                        <label style={styles.label}>Nom d'utilisateur</label>
                        <input name="username" value={user.username} style={{...styles.input, opacity: 0.6}} readOnly />
                    </div>

                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label style={styles.label}>Prénom</label>
                            <input name="firstName" value={user.firstName} onChange={handleChange} style={styles.input} />
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>Nom</label>
                            <input name="lastName" value={user.lastName} onChange={handleChange} style={styles.input} />
                        </div>
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Email</label>
                        <input name="email" value={user.email} onChange={handleChange} style={styles.input} />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Nouveau mot de passe</label>
                        <input type="password" name="password" placeholder="Laissez vide pour garder l'actuel" onChange={handleChange} style={styles.input} />
                    </div>

                    <button type="submit" style={styles.button}>
                        <FaSave style={{ marginRight: '8px' }} /> Enregistrer les modifications
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: { paddingTop: '100px', display: 'flex', justifyContent: 'center', paddingBottom: '50px', background: 'var(--background-color)', minHeight: '100vh' },
    center: { paddingTop: '150px', textAlign: 'center', color: 'var(--text-color)' },
    card: { background: 'var(--card-background)', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', width: '90%', maxWidth: '500px', border: '1px solid var(--border-color)' },
    header: { textAlign: 'center', marginBottom: '30px' },
    title: { marginTop: '10px', color: 'var(--text-color)' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px' },
    field: { display: 'flex', flexDirection: 'column' },
    label: { marginBottom: '5px', fontSize: '14px', color: 'var(--text-color)', opacity: 0.8 },
    row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
    input: { padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--background-color)', color: 'var(--text-color)', fontSize: '15px' },
    button: { marginTop: '20px', padding: '15px', borderRadius: '12px', border: 'none', background: '#f59e0b', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }
};

export default Profile;