import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

export default function ListQuizs() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "quizzes"),
      (snapshot) => {
        const quizzesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuizzes(quizzesData);
        setLoading(false);
      },
      (error) => {
        setError("Erreur lors du chargement des quizs");
        console.error(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleQuizClick = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  if (loading) return <div className="p-4 text-center">Chargement des quizs...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="quiz-page-container">
      <div className="navbar-placeholder"></div>
      <div className="modules-container">
        <div className="modules-cards">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="module-card">
              <div className="module-icon quiz-icon" aria-label={quiz.title}>
                <img src="/pics/quiz.png" alt="Quiz Icon" className="module-img" />
              </div>
              <h2>{quiz.title}</h2>
              <p>
                {quiz.language} • {quiz.questions.length} questions
                <br />
                Testez vos connaissances avec ce quiz interactif
              </p>
              <button
                onClick={() => handleQuizClick(quiz.id)}
                className="btn btn-primary"
              >
                Commencer
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}