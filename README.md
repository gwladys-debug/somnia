# 💤 Fè Moun Dòmi — Application d'Aide à la Gestion de l'Insomnie

** Fè Moun Dòmi ** est une application web moderne (Single Page Application) développée en **React**, conçue pour aider les utilisateurs à analyser la qualité de leur sommeil et à lutter contre l'insomnie. À travers un questionnaire ciblé de 4 questions, l'application évalue les habitudes quotidiennes et génère instantanément des recommandations personnalisées basées sur 4 piliers fondamentaux de la santé.

---

## 🎨 Charte Graphique & UI/UX

L'ambiance visuelle a été pensée pour être apaisante, moderne et parfaitement lisible en conditions de faible luminosité (idéal pour une utilisation nocturne).

*   **Arrière-plan général (Background) :** Gris foncé (`#212529`) pour limiter la fatigue oculaire.
*   **Cartes de contenu (Cards) :** Bleu clair (`#E3F2FD`) offrant un contraste doux et relaxant.
*   **Boutons d'action :** Gris perle (`#E0E0E0`) avec texte foncé, passant à un gris moyen (`#BDBDBD`) au survol pour une interaction intuitive.
*   **Typographie :** Épurée, sans sérif, centrée sur le confort visuel.
*   **Design :** Entièrement *Responsive* (Mobile-First), adapté aux smartphones, tablettes et ordinateurs.

---

## 🧭 Parcours Utilisateur & Structure de l'App

L'application utilise un système d'état dynamique (`useState`) pour faire naviguer l'utilisateur à travers 3 phases principales :

### 1. Page d'Accueil (`'home'`)
*   **Contenu :** Titre de l'application ("Fè Moun Dòmi "), phrase d'introduction bienveillante sur l'insomnie et description du fonctionnement du test.
*   **Action :** Un bouton central **"Commencer"** (Style gris perle) pour lancer le tunnel de questions.

### 2. Le Questionnaire (`4 Pages QCM`)
Chaque page affiche une question unique dans une carte bleu clair, accompagnée d'une barre de progression (ex: *Question 1 / 4*).
*   **Page 1 : Sommeil** ➔ Analyse de la durée des nuits.
*   **Page 2 : Relaxation** ➔ Évaluation du niveau de stress avant le coucher.
*   **Page 3 : Sport** ➔ Vérification du timing de l'activité physique.
*   **Page 4 : Boissons** ➔ Suivi de la consommation d'excitants (café, thé, alcool).

### 3. Page de Résultats (`'results'`)
Affiche le bilan sous forme de grille adaptative contenant **4 cartes conseils distinctes** (Sommeil, Relaxation, Sport, Boissons). Les conseils s'adaptent dynamiquement (profil Bon / Moyen / Mauvais) selon les réponses de l'utilisateur.
*   **Action :** Un bouton **"Refaire le test"** réinitialise l'application et redirige vers l'accueil.

---

## 💻 Spécifications Techniques

*   **Framework principal :** React (Functional Components)
*   **Gestion d'état :** Hook `useState` pour la navigation et la capture des scores.
*   **Style :** CSS3 standard encapsulé (compatible avec les CSS Modules ou Tailwind CSS).
*   **Prête pour Firebase :** La logique algorithmique est isolée des composants pour permettre un branchement direct avec **Firebase Firestore** et **Firebase Authentication**.

---

## 🚀 Installation Locale (Développement)

Pour l'installation et le lancement ce projet sur nos machines en locale :

```bash
# 1. Cloner le projet ou créer un dossier
mkdir somnia

# 2. Installer les dépendances (projet cloné avec package.json)
npm install

# 3. Lancer le serveur de développement local
npm run dev

# 4. node.js avec (https://nodejs.org/en/download)

# 3. React Native

# 4. Le paquet officiel : @genkit-ai/compat-oai
npm install @genkit-ai/compat-oai

Extrait de code
# 5. Clé API OpenAI officielle
OPENAI_API_KEY="sk-proj-..."

___________________________________________________________________________
📦 Guide de Déploiement
L'application étant purement Front-End (statique), elle est optimisée pour être déployée gratuitement en quelques minutes.
Option A : Déploiement sur Firebase Hosting (Recommandé mais non fonctionnel)
Bash
# 1. Compiler l'application pour la production
npm run build

# 2. Installer les outils Firebase si nécessaire
npm install -g firebase-tools

# 3. Connexion à votre compte Google/Firebase
firebase login

# 4. Initialiser Firebase Hosting dans le projet
firebase init hosting
# -> Choisir le projet existant
# -> Définir le dossier public sur : dist (ou build)
# -> Configurer en Single-Page App : Oui (Y)
# -> Écraser l'index.html : Non (N)

# 5. Déployer le projet en ligne
firebase deploy
Option B : Déploiement Flash (Vercel ou Netlify)
1.	Créez un build de production avec npm run build.
2.	Pour Vercel : Connectez votre dépôt GitHub à l'interface Vercel pour un déploiement automatique à chaque mise à jour de code.

___________________________________________________________________________
🛠️ Évolutions Futures (Back-End Firebase)
•	Firestore Database : Déporter le tableau des questions et le contenu textuel des recommandations sur une base de données Cloud.
•	Firebase Auth : Permettre aux utilisateurs de se connecter pour enregistrer leurs résultats et suivre l'évolution de leurs scores de sommeil sur un tableau de bord (Dashboard historique).
• 

________________________________________________________________________________
📦 	Arborescence

fé-moun-dòmi/
├── .firebase/                      # Fichiers de cache générés automatiquement par Firebase
├── .vscode/                        # Configuration de l'éditeur VS Code
│   └── settings.json               # Configuration pour activer Prettier (Format on save)
├── node_modules/                   # Tous les packages installés par npm (React, Firebase, etc.)
├── public/                         # Fichiers statiques distribués tels quels
│   ├── favicon.ico                 # Icône de l'onglet du navigateur
│   └── manifest.json               # Configuration si tu veux en faire une PWA (App installable)
├── src/                            # LE CŒUR DE L'APPLICATION (Code source)
│   ├── assets/                     # Fichiers médias locaux
│   │   ├── icons/                  # Logos ou illustrations personnalisées
│   │   └── sounds/                 # Optionnel : sons d'ambiance ou bruits blancs
│   ├── components/                 # Composants UI réutilisables et isolés
│   │   ├── Button/
│   │   │   ├── Button.jsx          # Le bouton gris perle générique
│   │   │   └── Button.css          # Styles du bouton (transitions, hovers)
│   │   ├── Card/
│   │   │   ├── Card.jsx            # La carte bleu clair réutilisable
│   │   │   └── Card.css            # Styles de la carte (shadows, border-radius)
│   │   └── ProgressBar/
│   │       ├── ProgressBar.jsx     # Indicateur visuel du questionnaire (Question X/4)
│   │       └── ProgressBar.css     # Styles de la barre
│   ├── config/                     # Initialisation des services tiers
│   │   └── firebase.js             # Configuration et connexion au SDK Firebase (Auth/Firestore)
│   ├── data/                       # Données statiques de l'application
│   │   └── questions.js            # Tableau JSON contenant tes 4 QCM et leurs scores
│   ├── hooks/                      # Hooks React personnalisés (Optionnel)
│   │   └── useQuiz.js              # Logique métier pour gérer l'état du questionnaire
│   ├── services/                   # Appels et requêtes vers la base de données
│   │   ├── authService.js          # Fonctions d'inscription/connexion anonyme ou par email
│   │   └── firestoreService.js     # Fonctions pour lire les questions et enregistrer les scores
│   ├── utils/                      # Fonctions d'aide (Helpers)
│   │   └── recommendationEngine.js # Algorithme de calcul des conseils selon les réponses
│   ├── views/                      # Les "Pages" (écrans) de ton tunnel utilisateur
│   │   ├── Home/
│   │   │   ├── HomeView.jsx        # Accueil : Titre, description, bouton Commencer
│   │   │   └── HomeView.css        # Styles de l'accueil
│   │   ├── Quiz/
│   │   │   ├── QuizView.jsx        # Le tunnel dynamique des 4 questions
│   │   │   └── QuizView.css        # Styles du questionnaire
│   │   └── Results/
│   │       ├── ResultsView.jsx     # Affichage des 4 cartes conseils personnalisées
│   │       └── ResultsView.css     # Styles de la grille de résultats (2x2)
│   ├── App.css                     # Styles CSS globaux (Variables de couleurs, reset CSS)
│   ├── App.jsx                     # Composant racine : gère le routage et la navigation entre les vues
│   ├── index.css                   # Styles de base appliqués au body (Gris foncé #212529)
│   └── main.jsx                    # Point d'entrée React qui injecte l'App dans le DOM HTML
├── .env.local                      # Clés secrètes Firebase (API_KEY, AUTH_DOMAIN...) - À ne jamais uploader !
├── .firestore.rules                # Règles de sécurité d'accès à ta base de données Firestore
├── .gitignore                      # Fichiers à ignorer par Git (node_modules, .env.local, dist)
├── firebase.json                   # Fichier de configuration principal pour Firebase Hosting
├── firestore.indexes.json          # Index de requêtes générés par Firebase pour Firestore
├── index.html                      # Le fichier HTML5 de base dans lequel React s'injecte
├── package-lock.json               # Historique strict des versions de tes dépendances npm
├── package.json                    # Configuration du projet et liste des packages (React, Lucide, Firebase)
├── README.md                       # La documentation de ton projet Fé Moun Dòmi
└── vite.config.js                  # Configuration du compilateur Vite (alias de dossiers, serveurs)
