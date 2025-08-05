import { Routes, Route } from "react-router-dom";
import SignIn from "../components/auth/SignIn.jsx";
import SignUp from "../components/auth/SignUp.jsx";
import Home from "../components/Home/Home.jsx";
import PronunciationHome from "../components/Prononciation/PronunciationHome.jsx";
import ListQuizs from "../components/Quiz/ListQuizs.jsx";
import QuizStandalone from "../components/Quiz/QuizStandalone.jsx";
import { AuthProvider } from "../components/auth/AuthContext.jsx";
import LanguageSelector from "../components/LanguageExplorer/LanguageSelector.jsx";
import Learn from "../components/Learn/Learn.jsx";
import LessonDetails from "../components/Learn/LessonDetails.jsx";
import VocabularyPage from "../components/Learn/VocabularyPage.jsx";
import Profile from "../components/Profile/Profile.jsx";
import About from "../components/About/About.jsx";
import Settings from "../components/Settings/Settings.jsx";
import CulturalDiscovery from "../components/CulturalDiscovery/CulturalDiscovery.jsx";
const AppRoutes = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="/settings" element={<Settings />} />

      {/* Routes du module quizzes */}

      <Route path="/quizzes" element={<ListQuizs />} />
      <Route path="/quiz/:quizId/:lessonId" element={<QuizStandalone />} />

      {/* Routes du module VocabularyExplorer */}
      <Route path="/language-selector" element={<LanguageSelector />} />

      {/* Routes du module Learn */}
      <Route path="/learn/categories" element={<Learn />} />
      <Route path="/learn/:language/:lessonId" element={<LessonDetails />} />
      <Route path="/vocabulary" element={<VocabularyPage />} />
      <Route path="/cultural-discovery" element={<CulturalDiscovery />} />
      {/* Routes du module Prononciation */}
      <Route path="/prononciation" element={<PronunciationHome />} />
    </Routes>
  </AuthProvider>
);

export default AppRoutes;
