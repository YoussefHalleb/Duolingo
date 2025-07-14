// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import SignIn from '../components/auth/SignIn.jsx';
import SignUp from '../components/auth/SignUp.jsx';
import Home from "../components/Home/Home.jsx";
import PronunciationHome from "../components/Prononciation/PronunciationHome.jsx";
import LanguageSelector from '../components/LanguageExplorer/LanguageSelector.jsx';
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<SignIn />} />
    <Route path="/home" element={<Home />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    
    {/* Routes du module VocabularyExplorer */}
    <Route path="/language-selector" element={<LanguageSelector />} />
    
    {/* Routes du module Quiz */}
    {/* Routes du module Prononciation */}
    <Route path="/prononciation" element={<PronunciationHome />} />


   
  </Routes>
);

export default AppRoutes;
