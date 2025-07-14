import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/auth/SignIn.jsx';
import SignUp from './components/auth/SignUp.jsx';
import Home from './pages/Home.jsx'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import QuizStandalone from './components/quiz/QuizStandalone.jsx';
import ListQuizs from './components/quiz/ListQuizs.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/quiz/:quizId" element={<QuizStandalone/>} />
        <Route path="/quizzes" element={<ListQuizs />} />
      </Routes>
    </Router>
  );
}

export default App;