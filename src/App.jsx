import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.jsx';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './components/auth/AuthContext'; // Updated import
import { setupUserLessonInit } from './utils/userLessonInit';
import { seedQuizzes } from './seedFirestore.js';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    seedQuizzes();
    setupUserLessonInit();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <AppRoutes />
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;