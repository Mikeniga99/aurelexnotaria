# Aurelex Notaires — Plateforme Institutionnelle & CMS Dédié

> Application web full-stack professionnelle pour l'office notarial **Aurelex Notaires** (Paris, France).  
> Conçue dans le cadre d'un test technique de recrutement à destination d'un jury d'évaluation senior et de leads techniques.

---

## Sommaire

1. [Vision & Spécifications Métier](#1-vision--spécifications-métier)
2. [Architecture Globale & Choix Techniques](#2-architecture-globale--choix-techniques)
3. [Charte Graphique & Identité Visuelle](#3-charte-graphique--identité-visuelle)
4. [Sécurité & Authentification (RBAC)](#4-sécurité--authentification-rbac)
5. [Structure du Monorepo](#5-structure-du-monorepo)
6. [Guide d'Installation & Lancement Local](#6-guide-dinstallation--lancement-local)
7. [Identifiants de Démonstration (Audit Senior)](#7-identifiants-de-démonstration-audit-senior)
8. [Tests & Assurance Qualité](#8-tests--assurance-qualité)
9. [Documentation des Endpoints API](#9-documentation-des-endpoints-api)
10. [Arguments pour l'Entretien Technique](#10-arguments-pour-lentretien-technique)

---

## 1. Vision & Spécifications Métier

L'application **Aurelex Notaires** simule avec une fidélité déontologique et juridique totale le fonctionnement d'un office notarial français de premier plan :
- **Authenticité & Déontologie :** Respect strict des obligations notariales (tarifs réglementés, serment, secret professionnel, médiateur du notariat, conformité RGPD).
- **Parcours Bilingue (FR / EN) :** URLs courtes, mémorables et optimisées pour le SEO (`/fr`, `/fr/etude`, `/fr/expertises`, `/fr/rendez-vous`).
- **CMS / Back-Office Vivant :** Aucune donnée codée en dur. Les indicateurs du tableau de bord sont calculés en temps réel via des agrégations relationnelles PostgreSQL.
- **Workflow de Demande de Rendez-vous :** Toute demande déposée sur le site public arrive avec le statut `PENDING` (En attente) et doit être confirmée par un membre de l'étude avec possibilité d'ajouter des notes internes confidentielles.

---

## 2. Architecture Globale & Choix Techniques

| Couche | Technologie Retenue | Justification Technique |
| :--- | :--- | :--- |
| **Frontend Public & CMS** | **Next.js 15 (App Router)** | Performance SSR/SSG, routage dynamique, bundling optimisé, reverse proxy natif |
| **Backend REST API** | **Node.js & Express (TypeScript strict)** | Contrôle fin du cycle de requête, middleware RBAC, session serveur, logs structurés |
| **Contrats Partagés** | **@notaria/contracts (Zod)** | Zéro divergence entre formulaires front et validation backend |
| **Base de Données & ORM** | **PostgreSQL & Prisma 6** | Schéma fortement typé, migrations versionnées, intégrité relationnelle |
| **Sécurité & Sessions** | **Argon2id + HttpOnly Cookies** | Résistance maximale au GPU cracking, immunité contre le vol XSS |
| **Internationalisation** | **next-intl** | Détection de locale, routes localisées élégantes, gestion des fallbacks |
| **Styles & UI** | **Tailwind CSS + Lucide Icons** | Design statutaire rapide, sans compromis sur l'accessibilité |

### Décision d'Architecture Clé : Le Reverse Proxy Next.js
Pour garantir une sécurité maximale des sessions sans subir les blocages de cookies tiers (comme Safari ITP) tout en préservant le découpage modulaire du monorepo, Next.js est configuré avec un reverse proxy interne (`rewrites`) :
- Toutes les requêtes `/api/v1/*` sont transmises de manière transparente à l'API Express.
- Les cookies de session `HttpOnly` demeurent en **Same-Origin**, éliminant les complications CORS tout en permettant à l'API d'être déployée séparément si nécessaire.

---

## 3. Charte Graphique & Identité Visuelle

L'univers visuel d'Aurelex Notaires a été calibré à partir des armoiries et du logotype officiel de l'étude :
- **Bordeaux profond (`#6B0F1A`) :** Solennité, autorité régalienne et prestige.
- **Champagne doré (`#C59B27`) :** Élégance, balance de la justice et finitions raffinées.
- **Ivoire lumineux (`#FAF7F2`) :** Fond chaleureux évitant la froideur clinique des blancs purs.
- **Beige champagne (`#F3ECE2`) :** Cartes, contrastes subtils et séparateurs doux.
- **Bordeaux brunâtre / Ébène (`#23070B`) :** Typographie haute lisibilité et pied de page statutaire.

---

## 4. Sécurité & Authentification (RBAC)

1. **Hachage Argon2id :** Utilisation des paramètres recommandés par l'ANSSI / OWASP (`memoryCost: 65536`, `timeCost: 3`, `parallelism: 1`).
2. **Cookies de Session Sécurisés :** Attributs `HttpOnly`, `SameSite=Lax` (ou `None; Secure` en production cross-domain), expiration glissante à 7 jours.
3. **Protection CSRF & CORS :** Filtrage strict de l'origine autorisée (`credentials: true`).
4. **Contrôle RBAC Côté Serveur :** Le masquage des boutons dans l'interface ne constitue pas une sécurité. Chaque route d'écriture API vérifie le rôle de l'utilisateur en base de données et renvoie `401 Unauthorized` ou `403 Forbidden`.
5. **Rate Limiting Anti Brute-Force :** Limitation stricte sur les tentatives de connexion (10 requêtes par 15 min) et sur les formulaires publics anti-spam.

---

## 5. Structure du Monorepo

```
aurelex-notaires/
├── apps/
│   ├── api/                    # Serveur Express, services métier, Prisma, tests
│   │   ├── prisma/             # Schéma PostgreSQL, migrations, seed
│   │   └── src/
│   │       ├── controllers/    # Contrôleurs REST
│   │       ├── middleware/     # Auth, RBAC, Rate Limiting, Error handling
│   │       ├── routes/         # Définition des routes /api/v1
│   │       ├── services/       # Logique métier et requêtes SQL
│   │       └── __tests__/      # Tests unitaires & intégration Supertest
│   └── web/                    # Frontend Next.js (Site public + CMS)
│       ├── public/images/      # Logo Aurelex et favicon
│       └── src/
│           ├── app/            # App Router (pages bilingues + /admin)
│           ├── components/     # Composants d'interface accessibles
│           ├── i18n/           # Configuration next-intl
│           └── messages/       # Dictionnaires de traduction fr.json et en.json
├── packages/
│   ├── contracts/              # Schémas Zod & types TypeScript partagés
│   └── typescript-config/      # Configurations tsconfig partagées
├── docker-compose.yml          # Service PostgreSQL conteneurisé
├── pnpm-workspace.yaml         # Définition des workspaces pnpm
├── package.json
└── README.md
```

---

## 6. Guide d'Installation & Lancement Local

### Prérequis
- **Node.js** v20 ou supérieur (testé et validé sous Node.js v24 LTS)
- **pnpm** v9+ (`npm install -g pnpm@9`)
- **PostgreSQL** (localement ou via Docker)

### Étapes d'installation

1. **Cloner le projet et installer les dépendances :**
   ```bash
   pnpm install
   ```

2. **Configurer les variables d'environnement :**
   Copiez `.env.example` en `.env` :
   ```bash
   cp .env.example .env
   ```

3. **Démarrer la base de données :**
   ```bash
   docker-compose up -d
   ```
   *(Ou assurez-vous que votre instance PostgreSQL locale écoute sur le port 5432).*

4. **Générer le client Prisma & insérer les données de démo :**
   ```bash
   pnpm --filter @notaria/api run prisma:generate
   pnpm --filter @notaria/api run prisma:migrate
   ```

5. **Lancer les deux applications en parallèle :**
   ```bash
   pnpm dev
   ```
   - **Site public :** [http://localhost:3000/fr](http://localhost:3000/fr)
   - **Espace Gestion (CMS) :** [http://localhost:3000/admin](http://localhost:3000/admin)
   - **API REST :** [http://localhost:4000/api/v1/health](http://localhost:4000/api/v1/health)

---

## 7. Identifiants de Démonstration (Audit Senior)

Pour tester immédiatement l'espace d'administration et auditer le traitement des dossiers :

| Champ | Valeur |
| :--- | :--- |
| **URL de connexion** | `/admin/login` |
| **Identifiant** | `admin@aurelex-notaires.fr` |
| **Mot de passe** | `AurelexAdmin2026!` |
| **Rôle attribué** | `SUPER_ADMIN` |

---

## 8. Tests & Assurance Qualité

Le projet intègre une suite de tests automatisés validant :
- Les contrats et règles de validation Zod (formats d'emails, longueur de mots de passe, motifs de RDV).
- Les vérifications RBAC côté serveur (accès non autorisé rejeté en 401).
- La résistance aux payloads invalides (erreurs 400 détaillées).

Pour exécuter la suite de tests :
```bash
pnpm --filter @notaria/api run test
```

---

## 9. Documentation des Endpoints API

Toutes les routes sont versionnées sous `/api/v1` :

### Authentification & Sessions
- `POST /api/v1/auth/login` : Authentification et création du cookie de session HttpOnly.
- `GET /api/v1/auth/me` : Profil de l'utilisateur connecté (Protégé).
- `POST /api/v1/auth/logout` : Destruction de session et révocation du cookie.

### Prise de Rendez-vous
- `POST /api/v1/appointments` : Dépôt public d'une demande (statut initial `PENDING`, rate-limité).
- `GET /api/v1/appointments` : Consultation avec filtres de statuts et recherche (Réservé collaborateurs).
- `PATCH /api/v1/appointments/:id/status` : Transition d'état (`CONFIRMED`, `REVIEWING`, `REJECTED`) et notes internes.

### Formulaire de Contact
- `POST /api/v1/contacts` : Envoi d'un message citoyen.
- `GET /api/v1/contacts` : Liste paginée administrative.
- `PATCH /api/v1/contacts/:id/read` : Marquage comme lu/traité.
- `PATCH /api/v1/contacts/:id/archive` : Archivage.

### CMS Bilingue & Contenus
- `GET /api/v1/articles` : Liste publique filtrée par langue (`locale=fr` ou `locale=en`).
- `GET /api/v1/articles/admin/all` : Vue administrative avec détection des traductions manquantes.
- `POST /api/v1/articles` : Création transactionnelle multilingue.
- `GET /api/v1/stats/dashboard` : Calcul en temps réel des indicateurs SQL du tableau de bord.

---

## 10. Arguments pour l'Entretien Technique

1. **Architecture Monorepo découplée :** Frontend et Backend sont testables et déployables indépendamment, tout en éliminant les divergences de typage grâce au package `@notaria/contracts`.
2. **Gestion bilingue native en base relationnelle :** Utilisation d'un pattern 1-n de traductions avec contraintes d'unicité `(locale, slug)`, assurant une parfaite indépendance des cycles de publication FR et EN.
3. **Sécurité par la conception :** Cookies HttpOnly inaccessibles en JS, protection anti-énumération, hachage Argon2id, logs d'audit sur chaque action sensible.
4. **Zéro maquette statique :** Chaque composant est relié à une API, chaque chiffre de dashboard provient d'une requête SQL réelle.
