
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, setDoc, doc } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAydcbXgJa4PFLUOzkFSIkdCiaONt_6BWA",
  authDomain: "duolingo-3cca3.firebaseapp.com",
  projectId: "duolingo-3cca3",
  storageBucket: "duolingo-3cca3.firebasestorage.app",
  messagingSenderId: "551642307155",
  appId: "1:551642307155:web:f35e15bc7505b0391ec4a6",
  measurementId: "G-BSC8LP9CX4"
};

const app = initializeApp(firebaseConfig, "SeedScript");
const db = getFirestore(app);

const quizData = [
  {
    id: "quiz1", // Ajout d'un ID explicite
    title: "Vocabulaire - Salutations",
    language: "français",
    questions: [
      {
        id: "q1",
        type: "multiple_choice",
        question: "Comment dit-on 'Bonjour' en anglais ?",
        options: ["Hello", "Goodbye", "Thank you", "Please"],
        correctAnswer: "Hello"
      },
      {
        id: "q2",
        type: "matching",
        question: "Associez les mots aux traductions",
        pairs: [
          { word: "Bonjour", translation: "Hello" },
          { word: "Au revoir", translation: "Goodbye" }
        ],
        correctAnswer: ["Bonjour:Hello", "Au revoir:Goodbye"] // Ajouté
      },
      {
        id: "q3",
        type: "free_text",
        question: "Traduisez 'Thank you' en français.",
        correctAnswer: "Merci"
      }
    ]
  },
  {
    id: "quiz2", // Ajout d'un ID explicite
    title: "Phrases de Voyage",
    language: "français",
    questions: [
      {
        id: "q4",
        type: "multiple_choice",
        question: "Comment dit-on 'Où est l'aéroport ?' en anglais ?",
        options: ["Where is the airport?", "What time is it?", "How much is it?", "Can you help me?"],
        correctAnswer: "Where is the airport?"
      }
    ]
  }
];

async function seedQuizzes() {
  try {
    console.log("Début de l'importation...");
    
    for (const quiz of quizData) {
      await setDoc(doc(db, "quizzes", quiz.id), {
        ...quiz,
        createdAt: new Date().toISOString()
      });
      console.log(`Quiz "${quiz.title}" importé avec ID: ${quiz.id}`);
    }
    
    console.log(" Tous les quizzes ont été importés avec succès !");
    process.exit(0);
  } catch (error) {
    console.error(" Erreur lors de l'importation:", error);
    process.exit(1);
  }
}

seedQuizzes();