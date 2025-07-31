# 📚 STRUCTURE COMPLÈTE DU PROJET DUOLINGO

## 🏗️ ARCHITECTURE GÉNÉRALE

**Type de Projet :** Application React moderne d'apprentissage de langues inspirée de Duolingo
**Build Tool :** Vite 4.4.5
**Framework :** React 18.2.0
**Styling :** Tailwind CSS 3.4.17
**Backend :** Firebase + Express.js
**Base de Données :** Firestore + Realtime Database

---

## 📁 STRUCTURE DES FICHIERS

```
Duolingo/
├── 📦 CONFIGURATION & BUILD
│   ├── package.json              # Dépendances et scripts
│   ├── vite.config.js            # Configuration Vite
│   ├── tailwind.config.js        # Configuration Tailwind CSS
│   ├── postcss.config.js         # Configuration PostCSS
│   ├── Dockerfile                # Containerisation
│   ├── nginx.conf                # Configuration Nginx
│   └── server.js                 # Serveur Express backend
│
├── 🎯 POINT D'ENTRÉE
│   ├── index.html                # HTML principal
│   └── src/
│       ├── index.jsx             # Point d'entrée React
│       └── App.jsx               # Composant racine
│
├── 🔐 AUTHENTIFICATION
│   └── src/components/auth/
│       ├── AuthContext.jsx       # Contexte d'authentification
│       ├── SignIn.jsx            # Page de connexion
│       └── SignUp.jsx            # Page d'inscription
│
├── 🏠 PAGES PRINCIPALES
│   └── src/components/
│       ├── Home/
│       │   ├── Home.css
│       │   └── Home.jsx          # Page d'accueil
│       ├── Profile/
│       │   ├── Profile.css
│       │   └── Profile.jsx       # Profil utilisateur
│       ├── Settings/
│       │   ├── Settings.css
│       │   └── Settings.jsx      # Paramètres
│       ├── About/
│       │   ├── About.css
│       │   └── About.jsx         # À propos
│       └── TestRTDB.jsx          # Test base de données
│
├── 📚 MODULE D'APPRENTISSAGE
│   └── src/components/Learn/
│       ├── Learn.css
│       ├── Learn.jsx             # Page principale des leçons
│       ├── LessonCard.jsx        # Carte de leçon
│       ├── LessonDetails.jsx     # Détails d'une leçon
│       ├── LessonList.jsx        # Liste des leçons
│       └── VocabularyPage.jsx    # Page vocabulaire
│
├── 🧩 MODULE QUIZ
│   └── src/components/Quiz/
│       ├── Quiz.css
│       ├── quiz.jsx              # Composant quiz principal
│       ├── QuizStandalone.jsx    # Quiz autonome
│       ├── ListQuizs.jsx         # Liste des quiz
│       ├── MultipleChoice.jsx    # Questions à choix multiples
│       ├── MatchingSimple.jsx    # Questions d'association
│       └── FreeInput.jsx         # Questions à réponse libre
│
├── 🗣️ MODULE PRONONCIATION
│   └── src/components/Prononciation/
│       ├── PronunciationHome.css
│       ├── PronunciationAnimations.css
│       └── PronunciationHome.jsx # Page principale
│
├── 🌍 MODULE CULTUREL
│   └── src/components/CulturalDiscovery/
│       ├── CulturalDiscovery.css
│       └── CulturalDiscovery.jsx # Découverte culturelle
│
├── 🔤 SÉLECTEUR DE LANGUE
│   └── src/components/LanguageExplorer/
│       └── LanguageSelector.jsx  # Sélection de langue
│
├── 🧩 COMPOSANTS PARTAGÉS
│   └── src/components/shared/
│       ├── layout.jsx            # Layout principal
│       ├── layout.css            # Styles du layout
│       ├── Navbar.jsx            # Barre de navigation
│       ├── Navbar.css            # Styles navbar
│       ├── Footer.jsx            # Pied de page
│       ├── Footer.css            # Styles footer
│       ├── Button.jsx            # Composant bouton
│       └── Button.css            # Styles bouton
│
├── 🗄️ GESTION D'ÉTAT & CONTEXTE
│   └── src/context/
│       ├── LanguageContext.js    # Contexte des langues
│       └── LanguageProvider.jsx  # Provider des langues
│
├── 📁 DONNÉES & CONFIGURATION
│   ├── src/data/
│   │   ├── cultural_cards.json   # Cartes culturelles
│   │   ├── languageData.js       # Données des langues
│   │   ├── lessonData.js         # Données des leçons
│   │   ├── quizData.js           # Données des quiz
│   │   └── importfirebase.js     # Import Firebase
│   ├── src/config/
│   │   └── firebase.js           # Configuration Firebase
│   └── src/utils/
│       └── userLessonInit.js     # Initialisation leçons utilisateur
│
├── 🎨 ASSETS & RESSOURCES
│   └── public/
│       ├── 🎵 AUDIO (10 langues)
│       │   ├── de-1-0.mp3 à de-3-4.mp3    # Allemand (15 fichiers)
│       │   ├── en-1-0.mp3 à en-3-4.mp3    # Anglais (15 fichiers)
│       │   ├── es-1-0.mp3 à es-3-4.mp3    # Espagnol (15 fichiers)
│       │   ├── fr-1-0.mp3 à fr-3-4.mp3    # Français (15 fichiers)
│       │   ├── it-1-0.mp3 à it-3-4.mp3    # Italien (15 fichiers)
│       │   ├── ja-1-0.mp3 à ja-3-4.mp3    # Japonais (15 fichiers)
│       │   ├── ko-1-0.mp3 à ko-3-4.mp3    # Coréen (15 fichiers)
│       │   ├── nl-1-0.mp3 à nl-3-4.mp3    # Néerlandais (15 fichiers)
│       │   ├── pt-1-0.mp3 à pt-3-4.mp3    # Portugais (15 fichiers)
│       │   ├── ru-1-0.mp3 à ru-3-4.mp3    # Russe (15 fichiers)
│       │   └── zh-1-0.mp3 à zh-3-4.mp3    # Chinois (15 fichiers)
│       │
│       ├── 🖼️ IMAGES
│       │   ├── cultural_cards/           # Images culturelles (24 fichiers)
│       │   │   ├── Business-UK.jpg
│       │   │   ├── celebrate-thanksgiving.jpg
│       │   │   ├── Dining-Etiquette.jpg
│       │   │   ├── dutch-biking.jpg
│       │   │   ├── dutch-food.jpg
│       │   │   ├── fete-musique.jpg
│       │   │   ├── french-food.jpg
│       │   │   ├── french-travel.jpg
│       │   │   ├── german-business.jpg
│       │   │   ├── german-shopping.jpg
│       │   │   ├── italian-airport.jpg
│       │   │   ├── italian-culture.png
│       │   │   ├── kings-day.jpg
│       │   │   ├── maslenitsa.jpg
│       │   │   ├── Oktoberfest-Munich.jpg
│       │   │   ├── portuguese-business.jpg
│       │   │   ├── portuguese-restaurant.jpg
│       │   │   ├── rio-carnival.jpg
│       │   │   ├── russian-ballet.jpg
│       │   │   ├── russian-tea.jpg
│       │   │   ├── spanish-food.jpg
│       │   │   ├── spanish-travel.jpg
│       │   │   ├── tomatina.jpg
│       │   │   └── venice-carnival.jpg
│       │   │
│       │   ├── flags/                    # Drapeaux des pays (11 fichiers)
│       │   │   ├── allemagne.png
│       │   │   ├── chine.png
│       │   │   ├── coree-du-sud.png
│       │   │   ├── italie.png
│       │   │   ├── japon.png
│       │   │   ├── la-france.png
│       │   │   ├── le-portugal.png
│       │   │   ├── monde.png
│       │   │   ├── pays-bas.png
│       │   │   ├── royaume-uni.png
│       │   │   └── rusia.png
│       │   │
│       │   ├── pics/                     # Images générales (7 fichiers)
│       │   │   ├── avatar-horse.png
│       │   │   ├── microphone.png
│       │   │   ├── quiz.png
│       │   │   ├── reglage.png
│       │   │   ├── sortie.png
│       │   │   ├── utilisateur.png
│       │   │   └── vocabulaire.png
│       │   │
│       │   ├── favicon.ico
│       │   ├── logo192.png
│       │   ├── logo512.png
│       │   ├── manifest.json
│       │   ├── robots.txt
│       │   └── index.html
│       │
│       └── 📄 AUTRES FICHIERS
│           ├── firebase-debug.log
│           ├── generate_audio.py
│           ├── lessons_firestore.json
│           └── seedFirestore.js
```

---

## 🔧 TECHNOLOGIES UTILISÉES

### **Frontend**
- **React 18.2.0** - Framework principal
- **Vite 4.4.5** - Build tool et dev server
- **React Router DOM 6.30.1** - Navigation
- **Tailwind CSS 3.4.17** - Styling
- **React Icons 5.5.0** - Icônes
- **React Beautiful DnD 13.1.1** - Drag & Drop
- **React DnD 16.0.1** - Drag & Drop avancé

### **Backend & Base de Données**
- **Firebase 11.10.0** - Backend as a Service
  - **Authentication** - Connexion utilisateurs
  - **Firestore** - Base de données NoSQL
  - **Realtime Database** - Données temps réel
- **Firebase Admin 13.4.0** - Administration Firebase
- **Express.js 4.19.2** - Serveur API simple
- **CORS 2.8.5** - Cross-origin requests

### **Développement**
- **ESLint 8.45.0** - Linting
- **PostCSS 8.5.6** - Post-processing CSS
- **Autoprefixer 10.4.21** - Préfixes CSS
- **Concurrently 9.2.0** - Exécution parallèle

---

## 🚀 SCRIPTS DISPONIBLES

```json
{
  "scripts": {
    "import-firestore": "node src/importfirebase.js",
    "dev": "concurrently \"npm run server\" \"vite\"",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "server": "node server.js"
  }
}
```

---

## 🌐 ROUTES DE L'APPLICATION

| Route | Composant | Description |
|-------|-----------|-------------|
| `/` | SignIn | Page de connexion (route par défaut) |
| `/home` | Home | Page d'accueil |
| `/signin` | SignIn | Page de connexion |
| `/signup` | SignUp | Page d'inscription |
| `/profile` | Profile | Profil utilisateur |
| `/about` | About | À propos |
| `/settings` | Settings | Paramètres |
| `/quizzes` | ListQuizs | Liste des quiz |
| `/quiz/:quizId/:lessonId` | QuizStandalone | Quiz spécifique |
| `/language-selector` | LanguageSelector | Sélecteur de langue |
| `/learn/categories` | Learn | Catégories d'apprentissage |
| `/learn/:language/:lessonId` | LessonDetails | Détails de leçon |
| `/vocabulary` | VocabularyPage | Page vocabulaire |
| `/cultural-discovery` | CulturalDiscovery | Découverte culturelle |
| `/prononciation` | PronunciationHome | Module prononciation |
| `/test-rtdb` | TestRTDB | Test base de données |

---

## 🔥 FONCTIONNALITÉS PRINCIPALES

### **1. 🔐 Authentification**
- Connexion avec email/mot de passe
- Connexion avec Google
- Gestion des sessions utilisateur
- Protection des routes

### **2. 🌍 Apprentissage de Langues**
- **10 langues supportées :**
  - 🇩🇪 Allemand (de)
  - 🇺🇸 Anglais (en)
  - 🇪🇸 Espagnol (es)
  - 🇫🇷 Français (fr)
  - 🇮🇹 Italien (it)
  - 🇯🇵 Japonais (ja)
  - 🇰🇷 Coréen (ko)
  - 🇳🇱 Néerlandais (nl)
  - 🇵🇹 Portugais (pt)
  - 🇷🇺 Russe (ru)
  - 🇨🇳 Chinois (zh)

### **3. 📚 Système de Leçons**
- Catégories d'apprentissage
- Leçons progressives
- Suivi de progression
- Système de révision

### **4. 🧩 Système de Quiz**
- Questions à choix multiples
- Questions d'association
- Questions à réponse libre
- Quiz autonomes
- Évaluation automatique

### **5. 🗣️ Module Prononciation**
- Fichiers audio pour chaque langue
- Interface d'enregistrement
- Comparaison avec prononciation native
- Animations visuelles

### **6. 🌍 Découverte Culturelle**
- Cartes culturelles par langue
- Informations sur les coutumes
- Images culturelles
- Contexte historique

### **7. 👤 Gestion de Profil**
- Informations utilisateur
- Progression par langue
- Statistiques d'apprentissage
- Paramètres personnalisés

### **8. 🎨 Interface Utilisateur**
- Design responsive avec Tailwind CSS
- Navigation intuitive
- Animations fluides
- Support multilingue

---

## 🗄️ STRUCTURE DES DONNÉES

### **Firebase Firestore Collections**
- `users` - Données utilisateurs
- `lessons` - Données des leçons
- `quizzes` - Données des quiz
- `userProgress` - Progression utilisateur
- `culturalCards` - Cartes culturelles

### **Realtime Database**
- Données temps réel utilisateur
- État de session
- Notifications

### **Fichiers Statiques**
- `cultural_cards.json` - Cartes culturelles
- `languageData.js` - Configuration des langues
- `lessonData.js` - Structure des leçons
- `quizData.js` - Questions de quiz

---

## 🔧 CONFIGURATION FIREBASE

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAydcbXgJa4PFLUOzkFSIkdCiaONt_6BWA",
  authDomain: "duolingo-3cca3.firebaseapp.com",
  projectId: "duolingo-3cca3",
  storageBucket: "duolingo-3cca3.firebasestorage.app",
  messagingSenderId: "551642307155",
  appId: "1:551642307155:web:f35e15bc7505b0391ec4a6",
  measurementId: "G-BSC8LP9CX4",
  databaseURL: "https://duolingo-3cca3-default-rtdb.europe-west1.firebasedatabase.app/"
};
```

---

## 🚀 DÉPLOIEMENT

### **Docker**
- `Dockerfile` pour containerisation
- `nginx.conf` pour serveur web
- Configuration de production

### **Scripts de Build**
- `npm run build` - Build de production
- `npm run preview` - Prévisualisation
- `npm run dev` - Développement local

---

## 📊 STATISTIQUES DU PROJET

- **Total des fichiers :** ~200+
- **Langues supportées :** 10
- **Fichiers audio :** 150 (15 par langue)
- **Images culturelles :** 24
- **Composants React :** 25+
- **Routes :** 16
- **Modules principaux :** 6

---

## 🎯 OBJECTIFS DU PROJET

1. **Apprentissage interactif** des langues
2. **Expérience utilisateur** fluide et engageante
3. **Contenu culturel** enrichissant
4. **Progression personnalisée** par utilisateur
5. **Interface moderne** et responsive
6. **Performance optimisée** avec Vite
7. **Scalabilité** avec Firebase

---

## 🔮 ÉVOLUTIONS FUTURES

- Ajout de nouvelles langues
- Système de gamification avancé
- Intelligence artificielle pour personnalisation
- Mode hors ligne
- Application mobile
- Communauté d'apprenants
- Certifications de niveau

---

*Ce projet représente une application d'apprentissage de langues complète et moderne, utilisant les meilleures pratiques de développement React et Firebase.* 