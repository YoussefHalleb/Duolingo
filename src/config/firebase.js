import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyC4SyBjxd0uev9zFb5dDb8jmseJoyL6sYc",
  authDomain: "duolingo-project-51582.firebaseapp.com",
  projectId: "duolingo-project-51582",
  storageBucket: "duolingo-project-51582.appspot.com", 
  messagingSenderId: "477863235948",
  appId: "1:477863235948:web:2244dd29736a3794836349",
  measurementId: "G-H2P3XM90PB"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);


const googleProvider = new GoogleAuthProvider();


googleProvider.setCustomParameters({
  prompt: 'select_account'
});


export { 
  auth, 
  db,
  googleProvider,
  signInWithPopup
};