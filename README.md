# Ustock

Ustock est une application de gestion de stock pour une maison de vente aux enchères, construite avec **Next.js** et **Supabase**. Elle permet d'enregistrer, classer, décrire et suivre les objets à vendre, avec reconnaissance vocale et génération automatique d’annonces.

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
- 📤 Génération d’annonces pour Selency, Le Bon Coin, Gens de Confiance
- ☁️ Synchro Cloud & partage

---

## 🔧 Installation

```bash
git clone https://github.com/<ton-utilisateur>/ustock.git
cd ustock
npm install
cp .env.local.example .env.local
npm run dev
