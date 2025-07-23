import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.jsx';
import { LanguageProvider } from './context/LanguageProvider';
import { seedQuizzes } from './seedFirestore.js';
import { useEffect } from 'react';

function App() {
    useEffect(() => {
    seedQuizzes();
  }, []);
  return (
    <Router>
      <LanguageProvider>
        <AppRoutes />
      </LanguageProvider>
    </Router>
  );
}

export default App;
