import React from 'react';
import { Link } from 'react-router-dom';
import { FaCarSide, FaCalendarAlt, FaKey, FaClock, FaShieldAlt, FaTimesCircle, FaCoins, FaGasPump, FaCogs } from 'react-icons/fa';
import carHomeImg from '../assets/car_home.jpg'; 

const mockCars = [
  {
    id: 1,
    brand: 'Dacia',
    model: 'Sandero Stepway',
    year: 2024,
    dailyRate: 350.0,
    fuelType: 'DIESEL',
    transmission: 'MANUAL',
    status: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 2,
    brand: 'Hyundai',
    model: 'Tucson',
    year: 2025,
    dailyRate: 600.0,
    fuelType: 'HYBRID',
    transmission: 'AUTOMATIC',
    status: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 3,
    brand: 'Volkswagen',
    model: 'Golf 8',
    year: 2024,
    dailyRate: 500.0,
    fuelType: 'GASOLINE',
    transmission: 'AUTOMATIC',
    status: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=500&auto=format&fit=crop&q=60'
  }
];

function Home() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      background: 'var(--home-bg)',
      color: 'var(--home-text)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'background 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '120px 10% 80px 10%',
        gap: '80px',
        position: 'relative'
      }}>
        <div style={{ 
          flex: '1.2',
          maxWidth: '580px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          zIndex: 2
        }}>
          <div style={{
            background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05))',
            padding: '8px 18px',
            borderRadius: '100px',
            fontSize: '13px',
            fontWeight: '700',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: '#f59e0b',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            marginBottom: '28px',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.05)'
          }}>
            ✦ Service Premium Maroc
          </div>

          <h1 style={{
            fontSize: '56px',
            fontWeight: '900',
            lineHeight: '1.1',
            marginBottom: '24px',
            letterSpacing: '-2px',
            background: 'linear-gradient(180deg, var(--home-text) 0%, rgba(var(--home-text), 0.8) 100%)',
            WebkitBackgroundClip: 'text'
          }}>
            Louez l'excellence <br />en un Clic.
          </h1>

          <p style={{
            fontSize: '18px',
            color: 'var(--home-desc)',
            lineHeight: '1.65',
            marginBottom: '40px',
            maxWidth: '500px'
          }}>
            Simplifiez vos déplacements avec une expérience fluide, des véhicules rigoureusement sélectionnés et une transparence tarifaire absolue.
          </p>

          <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
            <Link to="/cars" style={{
              background: '#f59e0b',
              color: '#0f172a',
              padding: '18px 38px',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 12px 30px rgba(245, 158, 11, 0.25)',
              transition: 'transform 0.2s ease, boxShadow 0.2s ease'
            }}>
              Explorer le catalogue
            </Link>
            
            <Link to="/login" style={{
              background: 'var(--card-inline)',
              color: 'var(--home-text)',
              padding: '18px 38px',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
            }}>
              Créer un compte
            </Link>
          </div>
        </div>

        <div style={{
          flex: '1',
          display: 'flex',
          justifyContent: 'flex-end',
          height: '560px',
          maxWidth: '620px',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '32px',
            overflow: 'hidden',
            boxShadow: '0 30px 70px rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <img 
              src={carHomeImg} 
              alt="Sports Car" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
          <div style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, rgba(0,0,0,0) 70%)',
            zIndex: -1,
            pointerEvents: 'none'
          }} />
        </div>
      </div>

      <div style={{
        padding: '100px 10%',
        background: 'var(--card-background)',
        textAlign: 'center',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'background 0.4s ease'
      }}>
        <h2 style={{ 
          fontSize: '36px', 
          fontWeight: '800', 
          marginBottom: '60px', 
          color: 'var(--home-text)',
          letterSpacing: '-1px'
        }}>
          Louer en 3 étapes simples
        </h2>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px' }}>
          <div style={{ 
            flex: '1', 
            padding: '35px 25px', 
            background: 'var(--card-inline)', 
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
          }}>
            <div style={{ 
              background: 'rgba(245, 158, 11, 0.1)', 
              width: '70px', 
              height: '70px', 
              borderRadius: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 25px auto' 
            }}>
              <FaCarSide size={28} color="#f59e0b" />
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px', color: 'var(--home-text)' }}>1. Choose</h3>
            <p style={{ color: 'var(--home-desc)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>Sélectionnez le véhicule idéal parmi notre catalogue de voitures citadines, SUV ou berlines.</p>
          </div>

          <div style={{ 
            flex: '1', 
            padding: '35px 25px', 
            background: 'var(--card-inline)', 
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
          }}>
            <div style={{ 
              background: 'rgba(245, 158, 11, 0.1)', 
              width: '70px', 
              height: '70px', 
              borderRadius: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 25px auto' 
            }}>
              <FaCalendarAlt size={26} color="#f59e0b" />
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px', color: 'var(--home-text)' }}>2. Book</h3>
            <p style={{ color: 'var(--home-desc)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>Indiquez vos dates de prise en charge et de restitution. Validez votre demande en un clic.</p>
          </div>

          <div style={{ 
            flex: '1', 
            padding: '35px 25px', 
            background: 'var(--card-inline)', 
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
          }}>
            <div style={{ 
              background: 'rgba(245, 158, 11, 0.1)', 
              width: '70px', 
              height: '70px', 
              borderRadius: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 25px auto' 
            }}>
              <FaKey size={26} color="#f59e0b" />
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px', color: 'var(--home-text)' }}>3. Drive</h3>
            <p style={{ color: 'var(--home-desc)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>Récupérez les clés auprès de notre agence locale et profitez de votre voyage en toute liberté.</p>
          </div>
        </div>
      </div>

      {/* SECTION NOUVEAUTÉS : CARS DOCK DATA */}
      <div style={{
        padding: '100px 10%',
        background: 'var(--home-bg)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
          <div>
            <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'var(--home-text)', letterSpacing: '-1px', marginBottom: '10px' }}>
              Notre Flotte Vedette
            </h2>
            <p style={{ color: 'var(--home-desc)', fontSize: '16px', margin: 0 }}>
              Découvrez une sélection de nos véhicules disponibles immédiatement.
            </p>
          </div>
          <Link to="/cars" style={{ color: '#f59e0b', fontWeight: '700', textDecoration: 'none', fontSize: '16px' }}>
            Voir tout le catalogue &rarr;
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {mockCars.map((car) => (
            <div key={car.id} style={{
              background: 'var(--card-background)',
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ height: '220px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                <img src={car.image} alt={`${car.brand} ${car.model}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: '#10b981',
                  color: '#fff',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '700'
                }}>
                  {car.status}
                </span>
              </div>
              <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13px', color: '#f59e0b', fontWeight: '700', textTransform: 'uppercase', marginBottom: '5px' }}>{car.brand}</span>
                <h3 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 15px 0', color: 'var(--home-text)' }}>{car.model}</h3>
                
                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--home-desc)' }}>
                    <FaGasPump size={14} color="#f59e0b" /> {car.fuelType}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'var(--home-desc)' }}>
                    <FaCogs size={14} color="#f59e0b" /> {car.transmission}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <div>
                    <span style={{ fontSize: '24px', fontWeight: '900', color: 'var(--home-text)' }}>{car.dailyRate} DH</span>
                    <span style={{ fontSize: '13px', color: 'var(--home-desc)' }}> / jour</span>
                  </div>
                  <Link to="/login" style={{
                    background: 'var(--card-inline)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--home-text)',
                    padding: '10px 20px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '700',
                    textDecoration: 'none'
                  }}>
                    Réserver
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        padding: '100px 10%',
        background: 'var(--home-bg)',
        transition: 'background 0.4s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '80px' }}>
          <div style={{ flex: '1', maxWidth: '480px' }}>
            <h2 style={{ fontSize: '40px', fontWeight: '900', marginBottom: '24px', color: 'var(--home-text)', letterSpacing: '-1px', lineHeight: '1.15' }}>
              Pourquoi faire confiance à Clic & Roule ?
            </h2>
            <p style={{ color: 'var(--home-desc)', fontSize: '17px', lineHeight: '1.6', margin: 0 }}>
              Nous redéfinissons la location de véhicules au Maroc en éliminant les frais cachés et les attentes interminables aux comptoirs.
            </p>
          </div>

          <div style={{ flex: '1.3', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ background: 'var(--card-inline)', padding: '30px', borderRadius: '20px', border: '1px solid var(--border-color)', boxShadow: '0 10px 25px rgba(0,0,0,0.01)' }}>
              <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                <FaClock size={24} color="#f59e0b" />
              </div>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '19px', fontWeight: '700', color: 'var(--home-text)' }}>Support 24/7</h4>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--home-desc)', lineHeight: '1.5' }}>Une assistance technique à votre écoute pour pallier tout imprévu sur la route.</p>
            </div>
            <div style={{ background: 'var(--card-inline)', padding: '30px', borderRadius: '20px', border: '1px solid var(--border-color)', boxShadow: '0 10px 25px rgba(0,0,0,0.01)' }}>
              <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                <FaShieldAlt size={24} color="#f59e0b" />
              </div>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '19px', fontWeight: '700', color: 'var(--home-text)' }}>Assurance Incluse</h4>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--home-desc)', lineHeight: '1.5' }}>Voyagez l'esprit tranquille grâce à notre couverture tous risques complète.</p>
            </div>
            <div style={{ background: 'var(--card-inline)', padding: '30px', borderRadius: '20px', border: '1px solid var(--border-color)', boxShadow: '0 10px 25px rgba(0,0,0,0.01)' }}>
              <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                <FaTimesCircle size={24} color="#f59e0b" />
              </div>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '19px', fontWeight: '700', color: 'var(--home-text)' }}>Annulation Gratuite</h4>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--home-desc)', lineHeight: '1.5' }}>Changement de programme ? Annulez sans frais jusqu'à 24h avant le départ.</p>
            </div>
            <div style={{ background: 'var(--card-inline)', padding: '30px', borderRadius: '20px', border: '1px solid var(--border-color)', boxShadow: '0 10px 25px rgba(0,0,0,0.01)' }}>
              <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                <FaCoins size={24} color="#f59e0b" />
              </div>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '19px', fontWeight: '700', color: 'var(--home-text)' }}>Prix Transparents</h4>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--home-desc)', lineHeight: '1.5' }}>Le prix affiché lors de votre réservation est exactement le prix que vous payez.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;