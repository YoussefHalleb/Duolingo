import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc, getDocs, query, where } from "firebase/firestore";
import { quizData } from "./data/quizData";

const firebaseConfig = {
  apiKey: "AIzaSyAydcbXgJa4PFLUOzkFSIkdCiaONt_6BWA",
  authDomain: "duolingo-3cca3.firebaseapp.com",
  projectId: "duolingo-3cca3",
  storageBucket: "duolingo-3cca3.firebasestorage.app",
  messagingSenderId: "551642307155",
  appId: "1:551642307155:web:f35e15bc7505b0391ec4a6",
  measurementId: "G-BSC8LP9CX4",
};

const app = initializeApp(firebaseConfig, "SeedScript");
const db = getFirestore(app);

export const seedQuizzes = async () => {
  try {
    console.log("Début de l'importation dans Firestore...");

    const quizzesCollection = collection(db, "quizzes");

    for (const quiz of quizData) {
      const q = query(quizzesCollection, where("id", "==", quiz.id));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await setDoc(doc(db, "quizzes", quiz.id), {
          ...quiz,
          createdAt: new Date().toISOString(),
        });
        console.log(`Quiz "${quiz.title}" importé avec ID: ${quiz.id}`);
      } else {
        console.log(`Quiz "${quiz.title}" existe déjà avec ID: ${quiz.id}`);
      }
    }

    console.log("Tous les quizzes ont été importés avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'importation :", error);
    if (error.code === "permission-denied") {
      console.error("Erreur de permission : Vérifiez les règles Firestore pour permettre l'écriture dans la collection 'quizzes'.");
    } else if (error.code === "invalid-argument") {
      console.error("Erreur d'argument invalide : Assurez-vous que 'db' est une instance valide de Firestore.");
    }
  }
};