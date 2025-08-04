import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 
import { getDatabase } from 'firebase/database';

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app); // Cloud Firestore
const rtdb = getDatabase(app); // Realtime Database

// Verify database initialization
console.log('Firebase initialized:', {
  firestoreDB: db?._databaseId?.projectId,
  realtimeDB: rtdb?.app?.options?.databaseURL
});

console.log("Firebase initialized with config:", {
  projectId: firebaseConfig.projectId,
  databaseURL: firebaseConfig.databaseURL
});


const googleProvider = new GoogleAuthProvider();


googleProvider.setCustomParameters({
  prompt: 'select_account'
});


export { 
  auth, 
  db,
  rtdb, // Exportez rtdb pour utilisation
  googleProvider,
  signInWithPopup
};
