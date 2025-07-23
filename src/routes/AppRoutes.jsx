import { Routes, Route } from 'react-router-dom';
import SignIn from '../components/auth/SignIn.jsx';
import SignUp from '../components/auth/SignUp.jsx';
import Home from '../components/Home/Home.jsx';
import PronunciationHome from '../components/Prononciation/PronunciationHome.jsx';
import LanguageSelector from '../components/LanguageExplorer/LanguageSelector.jsx';
import Learn from '../components/Learn/Learn.jsx';
import LessonDetails from '../components/Learn/LessonDetails.jsx';
import VocabularyPage from '../components/Learn/VocabularyPage.jsx';
import LanguageChoice from '../components/Learn/LanguageChoice.jsx';
import TestRTDB from '../components/TestRTDB.jsx';
import Profile from '../components/Profile/Profile.jsx'; // Chemin corrigé
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<SignIn />} />
    <Route path="/home" element={<Home />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
   
    <Route path="/profile" element={<Profile />} />
    {/* Routes du module VocabularyExplorer */}
    <Route path="/language-selector" element={<LanguageSelector />} />
    {/* Routes du module Learn */}
    <Route path="/learn/categories" element={<Learn />} />
    <Route path="/language-choice" element={<LanguageChoice />} />
    <Route path="/learn/:language/:lessonId" element={<LessonDetails />} />
    <Route path="/vocabulary" element={<VocabularyPage />} />
    <Route path="/test-rtdb" element={<TestRTDB />} />
    {/* Routes du module Prononciation */}
    <Route path="/prononciation" element={<PronunciationHome />} />
  </Routes>
);

export default AppRoutes;