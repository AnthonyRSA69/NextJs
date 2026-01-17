# 🚀 DashPro

Plateforme de gestion d'abonnements et paiements production-ready construite avec **Next.js 16**, **Prisma**, et **Neon PostgreSQL**.

## 🎯 Objectifs

- ✅ Système d'authentification sécurisé (JWT + Argon2i)
- ✅ Protection des routes et des ressources
- ✅ Gestion des utilisateurs (inscription, connexion, réinitialisation de mot de passe)
- ✅ Intégration Stripe pour les paiements et abonnements récurrents
- ✅ Gestion des abonnements (création, annulation, réactivation)
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
│   ├── api/stripe/        # Paiements & Abonnements Stripe
│   ├── abonnement/        # Page gestion abonnements
│   ├── (pages)            # Pages publiques/protégées
│   ├── hooks/             # React hooks personnalisés
│   │   ├── use-payment.ts
│   │   ├── use-subscription.ts
│   │   └── ...
│   └── layout.tsx
│
├── components/
│   ├── *-form.tsx         # Formulaires (login, signup, etc.)
│   ├── payment-card.tsx   # Carte de paiement
│   ├── invoices-table.tsx # Tableau des factures
│   ├── payments-list.tsx  # Liste des paiements
│   └── ui/                # Composants shadcn/ui
│
├── lib/
│   ├── argon2i.ts         # Hachage passwords
│   ├── prisma.ts          # Instance DB
│   ├── otp.ts             # Logique OTP
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
- Routes publiques: `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/otp`
- Routes protégées: `/dashboard`, `/abonnement`

### Resend (Emails)

- Intégration pour envoi de liens de réinitialisation de password
- Tokens valides 1 heure
- Envoi automatique à l'inscription et oubli de password

---

---

## 📡 Routes API

| Route                       | Méthode | Description                                |
| --------------------------- | ------- | ------------------------------------------ |
| `/api/auth/register`        | POST    | Créer utilisateur (email + password)       |
| `/api/auth/login`           | POST    | Connexion (JWT en cookie)                  |
| `/api/auth/verify`          | GET     | Vérifier JWT valide                        |
| `/api/auth/password-forgot` | POST    | Demander réinitialisation                  |
| `/api/auth/reset-password`  | POST    | Appliquer nouveau password                 |
| `/api/stripe/checkout`      | POST    | Créer session abonnement Stripe            |
| `/api/stripe/subscriptions` | GET     | Récupérer les abonnements de l'utilisateur |
| `/api/stripe/subscriptions` | POST    | Réactiver un abonnement                    |
| `/api/stripe/subscriptions` | DELETE  | Annuler un abonnement                      |
| `/api/stripe/invoices`      | GET     | Récupérer les factures                     |
| `/api/stripe/invoice`       | POST    | Générer une facture                        |
| `/api/stripe/invoice`       | DELETE  | Supprimer une facture                      |

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

| Membre               | Rôle                                                             |
| -------------------- | ---------------------------------------------------------------- |
| **Richer Anthony**   | Inscription, OTP, **Intégration Resend**, Oubli password, Vercel |
| **Allier Esteban**   | Connexion, Oubli password, Setup BDD, Git, Vercel, UI            |
| **Archimbaud Irene** | Stripe, Dashboard                                                |

### Détails des contributions

- **Richer Anthony**

  - ✅ Formulaire d'inscription avec validation
  - ✅ Page et intégration OTP
  - ✅ Formulaire d'oubli et réinitialisation du MDP
  - ✅ Mise en place **Resend** pour emails automatiques
  - ✅ Hachage Argon2i

- **Allier Esteban**

  - ✅ Formulaire de connexion
  - ✅ Formulaire d'oubli et réinitialisation du MDP
  - ✅ Génération JWT et cookies HttpOnly
  - ✅ Gestion des branches Git et merges
  - ✅ UI/UX moderne avec shadcn/ui

- **Irene ARCHIMBAUD**

  - ✅ Page Dashboard (protégée)
  - ✅ Intégration Stripe (checkout)
  - ✅ Proxy
  - ✅ Résiliation abonnement

---

## ✅ Checklist avant rendu

- [x] `.env.local` dans `.gitignore`
- [x] Code testé et fonctionnel
- [x] Design responsive (mobile + desktop)
- [x] Routes protégées testées
- [x] Commits Git clairs et organisés
- [x] README à jour
- [x] Déployé sur Vercel
- [x] Variables d'env configurées 
- [x] Emails testés (Resend)

---

## 🚀 Application en ligne

**L'app est déployée et accessible ici:**

### 🔗 [https://next-js-git-master-anthos-projects-0b65de8f.vercel.app](https://next-js-git-master-anthos-projects-0b65de8f.vercel.app)

### Identifiants de test

- **Email:** anthony.richer@ecole-isitech.fr
- **Password:** 1234567890

---

**Dernière mise à jour:** 15 janvier 2026  
**Version:** 1.0.0  
**Statut:** 🚀 En développement  
**Équipe:** Anthony Richier | Allier Esteban | Irene ARCHIMBAUD
