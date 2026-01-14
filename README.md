# 🚀 RPI-DEV NextJs

Application web production-ready construite avec **Next.js 16**, **Prisma**, et **Neon PostgreSQL**.

## 🎯 Objectifs

- ✅ Système d'authentification sécurisé (JWT + Argon2i)
- ✅ Protection des routes et des ressources
- ✅ Gestion des utilisateurs (inscription, connexion, réinitialisation de mot de passe)
- ✅ Intégration Stripe pour les paiements
- ✅ Interface utilisateur moderne avec shadcn/ui
- ✅ Envoi d'emails automatiques (Resend)

## 📋 Table des matières
1. [Stack technique](#stack-technique)
2. [Installation](#installation)
3. [Lancement](#lancement)
4. [Architecture](#architecture)
5. [Authentification & Sécurité](#authentification--sécurité)
6. [Routes API](#routes-api)
7. [Équipe](#équipe)
8. [Déploiement](#déploiement)

---

## 🛠️ Stack technique

- **Next.js 16.1.1** (App Router)
- **React 18+** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Prisma ORM** + **Neon PostgreSQL**
- **JWT** pour authentification (7 jours d'expiration)
- **Argon2i** pour hachage des mots de passe
- **Resend** pour envoi d'emails
- **Stripe** pour paiements (sandbox)

---

## 💾 Installation

### Prérequis
- Node.js 18+
- Git

### Étapes

```bash
# Cloner le projet
git clone https://github.com/YOUR_USERNAME/RPI-DEV.git
cd RPI-DEV/NextJs

# Installer dépendances
npm install

# Créer .env.local
cp .env.example .env.local  # ou créer manuellement
```

### Variables d'environnement (.env.local)

```env
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"
JWT_SECRET="votre-clé-secrète-aléatoire"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
RESEND_API_KEY="re_..."
NEXT_PUBLIC_URL="http://localhost:3000"
NODE_ENV="development"
```

### Configurer la base de données

```bash
# Créer migrations Prisma
npx prisma migrate dev --name init

# (Optionnel) Voir les données
npx prisma studio
```

---

## 🚀 Lancement

```bash
npm run dev          # Mode développement (localhost:3000)
npm run build        # Build production
npm run start        # Lancer en production
npm run lint         # Vérifier le code
```

---

## 📁 Architecture

```
RPI-DEV/NextJs/
├── app/
│   ├── api/auth/          # Authentification (login, register, verify, reset)
│   ├── api/stripe/        # Paiements Stripe
│   ├── (pages)            # Pages publiques/protégées
│   ├── hooks/             # React hooks personnalisés
│   └── layout.tsx
│
├── components/
│   ├── *-form.tsx         # Formulaires (login, signup, etc.)
│   └── ui/                # Composants shadcn/ui
│
├── lib/
│   ├── argon2i.ts         # Hachage passwords
│   ├── prisma.ts          # Instance DB
│   └── utils.ts
│
├── middleware.ts          # Protection des routes
├── prisma/
│   └── schema.prisma      # Modèle de données
│
└── README.md
```

---

## 🔒 Authentification & Sécurité

### JWT (JSON Web Token)
- **Algorithme:** HS256
- **Durée:** 7 jours
- **Stockage:** Cookie HttpOnly 

### Argon2i - Hachage des mots de passe
- **À l'inscription:** Password → Argon2i Hash → Base de données
- **À la connexion:** Password saisi + Hash BD → Verification (true/false)

### Protection des routes
- **Middleware.ts** bloque l'accès aux routes protégées sans JWT
- **API /api/auth/verify** pour vérifier la validité du token côté client
- Routes publiques: `/login`, `/signup`, `/forgot-password`, `/reset-password`
- Routes protégées: `/dashboard`, `/otp`

### Resend (Emails)
- Intégration pour envoi de liens de réinitialisation de password
- Tokens valides 1 heure
- Envoi automatique à l'inscription et oubli de password

---

---

## 📡 Routes API

| Route | Méthode | Description |
|---|---|---|
| `/api/auth/register` | POST | Créer utilisateur (email + password) |
| `/api/auth/login` | POST | Connexion (JWT en cookie) |
| `/api/auth/verify` | GET | Vérifier JWT valide |
| `/api/auth/forgot-password` | POST | Demander réinitialisation |
| `/api/auth/reset-password` | POST | Appliquer nouveau password |
| `/api/stripe/checkout` | POST | Créer session paiement Stripe |

---

## 📊 Modèle de données

```prisma
model User {
  id_user          String    @id @default(cuid())
  firstName        String
  lastName         String
  email            String    @unique
  password         String    // Hash Argon2i
  resetToken       String?   // Pour reset password
  resetTokenExpiry DateTime?
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt
}
```

---

## 👥 Équipe et contributions

| Membre | Rôle |
|---|---|
| **Richer Anthony** | Inscription, OTP, **Intégration Resend** |
| **Allier Esteban** | Connexion, Oubli password, Setup BDD, Git |
| **Archimbaud Irene** | Stripe, Dashboard, UI |

### Détails des contributions

- **Richer Anthony**
  - ✅ Formulaire d'inscription avec validation
  - ✅ Page et intégration OTP
  - ✅ Mise en place **Resend** pour emails automatiques
  - ✅ Hachage Argon2i

- **Allier Esteban**
  - ✅ Formulaire de connexion avec mdp oublié
  - ✅ Génération JWT et cookies HttpOnly
  - ✅ Configuration Neon PostgreSQL
  - ✅ Gestion des branches Git et merges

- **Irene ARCHIMBAUD**
  - ✅ Page Dashboard (protégée)
  - ✅ Intégration Stripe (checkout)
  - ✅ UI/UX moderne avec shadcn/ui

- **UI** - Mélange de tous (composants, design, responsive)

---

## 🌐 Déploiement (Vercel)

### 1. Créer compte Vercel
```
https://vercel.com
```

### 2. Importer le projet
- Connecter GitHub
- Sélectionner le repo

### 3. Configurer variables d'environnement
```
Dashboard → Settings → Environment Variables

DATABASE_URL=...
JWT_SECRET=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
STRIPE_SECRET_KEY=...
RESEND_API_KEY=...
NEXT_PUBLIC_URL=https://votre-app.vercel.app
NODE_ENV=production
```

### 4. Déployer
```bash
git push origin main  # Vercel déploie automatiquement
```

---

## ✅ Checklist avant rendu

- [ ] `.env.local` dans `.gitignore`
- [ ] Code testé et fonctionnel
- [ ] Pas de console.log en production
- [ ] Design responsive (mobile + desktop)
- [ ] Routes protégées testées
- [ ] Commits Git clairs et organisés
- [ ] README à jour
- [ ] Déployé sur Vercel
- [ ] Variables d'env configurées (prod)
- [ ] Emails testés (Resend)

---

**Dernière mise à jour:** 14 janvier 2026  
**Version:** 1.0.0  
**Statut:** 🚀 En développement  
**Équipe:** Anthony Richier | Allier Esteban | Irene ARCHIMBAUD
