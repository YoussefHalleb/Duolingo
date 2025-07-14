// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import SignIn from '../components/auth/SignIn.jsx';
import SignUp from '../components/auth/SignUp.jsx';
import Home from "../components/Home/Home.jsx";
import ListQuizs from '../components/quiz/ListQuizs.jsx';
import QuizStandalone from '../components/quiz/QuizStandalone.jsx';
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<SignIn />} />
    <Route path="/home" element={<Home />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/quizzes" element={<ListQuizs />} />
    <Route path="/quiz/:quizId" element={<QuizStandalone />} />
    
    {/* Routes du module VocabularyExplorer */}
    {/* Routes du module Quiz */}
    {/* Routes du module Prononciation */}


   
  </Routes>
);

export default AppRoutes;
