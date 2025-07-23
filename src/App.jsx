import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.jsx';
import { LanguageProvider } from './context/LanguageProvider';
import { UserProvider } from './context/UserContext';
import { setupUserLessonInit } from './utils/userLessonInit';
function App() {
  setupUserLessonInit();
  return (
    <Router>
      <UserProvider>
      <LanguageProvider>
        <AppRoutes />
      </LanguageProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
