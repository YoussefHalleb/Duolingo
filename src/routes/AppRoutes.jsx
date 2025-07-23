// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import SignIn from '../components/auth/SignIn.jsx';
import SignUp from '../components/auth/SignUp.jsx';
import Home from "../components/Home/Home.jsx";
import ListQuizs from '../components/quiz/ListQuizs.jsx';
import QuizStandalone from '../components/quiz/QuizStandalone.jsx';
import PronunciationHome from "../components/Prononciation/PronunciationHome.jsx";
import LanguageSelector from '../components/LanguageExplorer/LanguageSelector.jsx';
import { AuthProvider } from '../components/auth/AuthContext.jsx';
import Learn from '../components/Learn/Learn.jsx'; 
import LessonDetails from '../components/Learn/LessonDetails.jsx';
import VocabularyPage from '../components/Learn/VocabularyPage.jsx'; 
import LanguageChoice from '../components/Learn/LanguageChoice.jsx'; 
import TestRTDB from '../components/TestRTDB.jsx'; // Ajoutez cette ligne
const AppRoutes = () => (
  <AuthProvider>
  <Routes>
    <Route path="/" element={<SignIn />} />
    <Route path="/home" element={<Home />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/quizzes" element={<ListQuizs />} />
    <Route path="/quiz/:quizId/:lessonId" element={<QuizStandalone />} />
    
    {/* Routes du module VocabularyExplorer */}
    <Route path="/language-selector" element={<LanguageSelector />} />
     {/* Routes du module Learn */}
     <Route path="/learn/categories" element={<Learn />} />
     <Route path="/language-choice" element={<LanguageChoice />} /> 
    <Route path="/learn/:id" element={<LessonDetails />} />
    <Route path="/vocabulary" element={<VocabularyPage />} /> 
    <Route path="/test-rtdb" element={<TestRTDB />} /> {/* Ajoutez cette ligne */} 
        {/* Routes du module Quiz */}

     {/* Routes du module Prononciation */}
    <Route path="/prononciation" element={<PronunciationHome />} />


   
  </Routes>
  </AuthProvider>
);

export default AppRoutes;
