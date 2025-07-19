import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 
import { getDatabase } from 'firebase/database'; // Ajout pour Realtime Database
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


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);//Auth
const db = getFirestore(app); // Firestore
const rtdb = getDatabase(app); // Realtime Database


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