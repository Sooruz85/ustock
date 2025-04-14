# UStock

Application de gestion de stock pour maison de vente aux enchères.

## Technologies utilisées

- Next.js 14
- TypeScript
- Chakra UI
- Supabase (Base de données et authentification)

## Configuration requise

- Node.js 18+
- npm ou yarn

## Installation

1. Clonez le repository :
```bash
git clone https://github.com/votre-username/ustock.git
cd ustock
```

2. Installez les dépendances :
```bash
npm install
```

3. Copiez le fichier `.env.example` en `.env.local` et remplissez les variables d'environnement :
```bash
cp .env.example .env.local
```

4. Démarrez le serveur de développement :
```bash
npm run dev
```

## Déploiement

L'application est configurée pour être déployée sur Vercel. Pour déployer :

1. Créez un compte sur [Vercel](https://vercel.com)
2. Connectez votre repository GitHub
3. Configurez les variables d'environnement dans les paramètres du projet Vercel
4. Déployez !

## Structure du projet

- `/src/app` - Pages et composants de l'application
- `/src/components` - Composants réutilisables
- `/src/lib` - Configuration et utilitaires
- `/src/types` - Types TypeScript

## Fonctionnalités

- Authentification utilisateur
- Gestion des objets (ajout, modification, suppression)
- Upload de photos
- Catégorisation des objets
- Estimation des prix

---

## 🚀 Stack technique

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage)
- Reconnaissance vocale via Web Speech API

---

## 📦 Fonctionnalités principales

- 📷 Prise de photo et enregistrement dans Supabase Storage
- 📝 Formulaire de description (titre, artiste, dimensions, etc.)
- 🎤 Reconnaissance vocale pour remplir les champs
- 🔍 Recherche avancée par nom, artiste, catégorie
- 📊 Statistiques & rapports sur les stocks et ventes
- 📤 Génération d'annonces pour Selency, Le Bon Coin, Gens de Confiance
- ☁️ Synchro Cloud & partage

---

## 🔧 Installation

```bash
git clone https://github.com/<ton-utilisateur>/ustock.git
cd ustock
npm install
cp .env.local.example .env.local
npm run dev
