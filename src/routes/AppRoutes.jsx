// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import SignIn from '../components/auth/SignIn.jsx';
import SignUp from '../components/auth/SignUp.jsx';
import Home from "../components/Home/Home.jsx";
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<SignIn />} />
    <Route path="/home" element={<Home />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    
    {/* Routes du module VocabularyExplorer */}
    {/* Routes du module Quiz */}
    {/* Routes du module Prononciation */}


   
  </Routes>
);

export default AppRoutes;
