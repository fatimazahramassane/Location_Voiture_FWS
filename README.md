# Gestion de Location de Vehicules — Car Rental System

Application Web Full-Stack pour la gestion intelligente d'une flotte de vehicules de location.
Projet de fin de module — Technologies Web (Filiere SDIA, promotion 2025-2026).

---

## Equipe et encadrement

| Role | Nom |
|------|-----|
| Realisatrice | Wijdane AARROUB |
| Realisatrice | Salma MAJRI |
| Realisatrice | Fatima-Zahra MASSANE |
| Encadrante | Oumayma AGHERAI |

---

## Apercu du projet

L'application **Clic&Roule** permet a plusieurs types d'utilisateurs (Administrateur, Manager d'agence, Client) de gerer une flotte de vehicules repartie dans des agences marocaines. Elle repose sur une architecture trois-tiers moderne : API REST Spring Boot securisee par JWT et interface React (SPA).

Le jeu de donnees initial est issu du dataset reel **USA Cars** (2 497 annonces), transforme en tarifs journaliers en MAD et distribue entre cinq agences (Casablanca, Rabat, Marrakech, Tanger, Fes).

---

## Technologies utilisees

### Backend

| Composant | Choix technique |
|-----------|----------------|
| Langage | Java 17 |
| Framework | Spring Boot 3.2.5 |
| Securite | Spring Security + JWT (HS256) |
| ORM | Spring Data JPA / Hibernate |
| Base de donnees | H2 (dev) — MySQL / PostgreSQL (prod) |
| Build | Maven |
| Documentation API | Swagger / OpenAPI 2.5 |

### Frontend

| Composant | Choix technique |
|-----------|----------------|
| Bibliotheque | React 18 |
| Routing | React Router (routes protegees) |
| HTTP Client | Axios (intercepteur JWT) |
| UI | CSS3 moderne |

---

## Demarrage rapide

### Prerequis

- Java JDK 17+ — https://adoptium.net/
- Node.js 16+ — https://nodejs.org/
- Maven — https://maven.apache.org/

### 1. Backend (Spring Boot)

```bash
cd car-rental-backend

# Compilation et lancement
mvn clean install
mvn spring-boot:run
```

Le backend demarre sur : `http://localhost:8080`

Documentation Swagger : `http://localhost:8080/swagger-ui/index.html`

### 2. Frontend (React)

```bash
cd location-voiture-frontend

# Installation des dependances
npm install

# Demarrage du serveur de developpement
npm run dev
```

Le frontend est accessible sur : `http://localhost:5173`

> Assurez-vous que le backend est lance avant de demarrer le frontend.

---

## Comptes utilisateurs par defaut

L'application se peuple automatiquement au demarrage via la classe `DataInitializer`.

| Nom d'utilisateur | Mot de passe | Role | Acces |
|------------------|-------------|------|-------|
| `admin` | `admin123` | ROLE_ADMIN | Acces complet : agences, vehicules, reservations, utilisateurs |
| `manager` | `manager123` | ROLE_MANAGER | Gestion des reservations et vehicules de son agence |
| `user` | `user123` | ROLE_USER | Consultation du catalogue et creation de reservations |

---

## Endpoints API principaux

| Module | Methode | Endpoint | Description | Acces |
|--------|---------|----------|-------------|-------|
| Auth | POST | `/api/auth/login` | Connexion — retourne un token JWT | Public |
| Auth | POST | `/api/auth/register` | Inscription client | Public |
| Auth | GET | `/api/users/profile` | Profil de l'utilisateur connecte | Authentifie |
| Vehicules | GET | `/api/cars` | Liste complete des vehicules | Public |
| Vehicules | GET | `/api/cars/available` | Vehicules disponibles | Public |
| Vehicules | POST | `/api/cars` | Ajouter un vehicule | Admin / Manager |
| Locations | POST | `/api/rentals` | Creer une reservation | Client |
| Locations | GET | `/api/rentals/my-history` | Historique des reservations du client | Client |
| Agences | GET | `/api/agencies` | Liste des agences | Public |

La politique de securite complete est definie dans `SecurityConfig.java`.

---

## Acteurs et permissions

| Acteur | Permissions |
|--------|-------------|
| Administrateur | CRUD vehicules et agences, gestion de toutes les reservations, acceptation / annulation |
| Manager d'agence | Gestion des reservations de son agence, acceptation / annulation locales |
| Client | Inscription, recherche et filtrage des vehicules, reservation, consultation de l'historique |

---

## Architecture technique

```
Navigateur (React SPA)
        |
        | HTTP / JSON + JWT
        v
Serveur Backend (Spring Boot)
  +-- Couche Web       : REST Controllers
  +-- Couche Metier    : Services & Logic
  +-- Couche Donnees   : Repositories (JPA / Hibernate)
        |
        | SQL
        v
Base de donnees H2
  +-- Dataset USA Cars (2 497 vehicules)
```

---

## Structure du projet

```
Location_Voiture_FWS/
|
+-- car-rental-backend/                  (Spring Boot)
|   +-- src/main/java/com/carrental/
|       +-- config/          SecurityConfig.java, DataInitializer.java
|       +-- controller/      AuthenticationController, CarController,
|       |                    AgencyController, RentalController, VehicleController
|       +-- dto/             Objets de transfert de donnees
|       +-- entity/          AppUser, Car, Agency, Rental, Vehicle (JPA)
|       +-- repository/      Interfaces Spring Data JPA
|       +-- security/        JwtAuthenticationFilter, JwtUtil,
|       |                    UserDetailsServiceImpl
|       +-- service/         Interfaces + implementations (CarServiceImpl,
|                            RentalServiceImpl, AgencyServiceImpl, AuthenticationServiceImpl)
|
+-- location-voiture-frontend/           (React 18)
    +-- src/
        +-- assets/          Images et icones
        +-- components/      Composants reutilisables (NavBar, Table, FormModal)
        +-- pages/           Home, Login, Cars, Booking, Dashboard,
        |                    Agences, Locations
        +-- services/        Appels Axios vers l'API
        +-- App.jsx
        +-- index.css
```

---

## Modele de donnees (entites JPA)

| Entite | Attributs cles | Relations |
|--------|---------------|-----------|
| `AppUser` | id, username, password (BCrypt), role | 1 -> N Rental |
| `Agency` | id, nom, adresse, ville, telephone, email | 1 -> N Car |
| `Car` | id, marque, modele, matricule, prixParJour, statut, carburant, transmission | N -> 1 Agency, 1 -> N Rental |
| `Rental` | id, dateDebut, dateFin, totalCost (calcule auto), statut | N -> 1 Car, N -> 1 AppUser |
| `Vehicle` | entite generique (heritage JPA JOINED) | base de Car |

Enumerations : `CarStatus`, `FuelType`, `Transmission`, `RentalStatus`, `VehicleStatus`, `Role`.

---

## Securite JWT — Flux d'authentification

1. Le client envoie ses identifiants a `/api/auth/login`.
2. `UserDetailsServiceImpl` valide les identifiants via Spring Security.
3. `JwtUtil` genere un token signe HS256 (contenant le role).
4. Le token est renvoye au frontend et stocke dans `localStorage`.
5. Chaque requete protegee inclut `Authorization: Bearer <token>`.
6. `JwtAuthenticationFilter` intercepte, valide le token et charge le contexte de securite.
7. `SecurityConfig` applique les regles d'acces par endpoint et methode HTTP.

---

## Initialisation des donnees (DataInitializer)

Au demarrage de l'application, la classe `DataInitializer` execute automatiquement :

1. Creation des trois comptes par defaut (admin, manager, user) avec mots de passe haches BCrypt.
2. Creation de cinq agences marocaines (Casablanca, Rabat, Marrakech, Tanger, Fes).
3. Import du fichier `USA_cars_datasets.csv` (2 497 lignes) avec :
   - Conversion du prix USD en tarif journalier MAD (plafonne entre 200 et 3 000 MAD, arrondi a 50 MAD).
   - Generation de plaques d'immatriculation marocaines (format `12345-A-1`).
   - Repartition round-robin des vehicules entre les cinq agences.

---

## Gestion des erreurs (GlobalExceptionHandler)

| Exception | Code HTTP | Cas d'usage |
|-----------|-----------|-------------|
| `ResourceNotFoundException` | 404 | Ressource introuvable |
| `ResourceAlreadyExistsException` | 409 | Doublon (plaque, nom d'agence) |
| `ResourceConflictException` | 409 | Vehicule non disponible sur la periode |
| `BadCredentialsException` | 401 | Identifiants incorrects |
| `AccessDeniedException` | 403 | Permissions insuffisantes |
| `MethodArgumentNotValidException` | 400 | Validation des champs du formulaire |

---

## Pistes d'amelioration

- Remplacer H2 par PostgreSQL ou MySQL en production.
- Ajouter des tests unitaires (JUnit, Mockito) et d'integration (Testcontainers).
- Implementer un calendrier de disponibilite par vehicule.
- Creer un dashboard analytique (revenus, taux d'occupation) avec Chart.js.
- Dockeriser l'application (`Dockerfile` + `docker-compose.yml`).
- Ajouter les notifications email via Spring Mail.
- Mettre en place une pagination serveur (Spring Data `Pageable`).
- Automatiser le build et le deploiement avec GitHub Actions (CI/CD).

---

## Documentation

- Rapport PDF : `./rapport.pdf`
- Diagramme de classes : `./docs/diagrams/class-diagram.png`
- Collection Postman : `./docs/postman/car-rental-api.postman_collection.json`
- Swagger UI (en local) : `http://localhost:8080/swagger-ui/index.html`

---

## Debogage

1. Verifiez que le port `8080` est libre avant de lancer le backend.
2. Lancez toujours le backend avant le frontend.
3. En cas d'erreur CORS, verifiez la propriete `cors.allowed-origins` dans `application.properties`.
4. Consultez les logs Maven ou la console du navigateur pour identifier les erreurs.

---

*Projet de fin de module — Technologies Web — Filiere SDIA — 2025-2026*
*ENSET Mohammedia — Universite Hassan II de Casablanca*
