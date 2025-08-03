import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { useLanguage } from "../../context/LanguageContext";
import "./Quiz.css";

export default function ListQuizs() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { selectedLanguage } = useLanguage();

  useEffect(() => {
    if (!selectedLanguage) {
      setError("Aucune langue sélectionnée");
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      collection(db, "quizzes"),
      (snapshot) => {
        const quizzesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(`Selected language: ${selectedLanguage}`);
        console.log("Raw quizzes data:", quizzesData);

        const filteredQuizzes = quizzesData.filter((quiz) => {
          const quizLang = quiz.language;
          console.log(`Quiz ${quiz.id} language: ${quizLang}`);
          return quizLang === selectedLanguage;
        });

        if (filteredQuizzes.length === 0) {
          setError(`Aucun quiz trouvé pour la langue ${getLanguageName(selectedLanguage)}`);
        } else {
          setError("");
        }
        setQuizzes(filteredQuizzes);
        setLoading(false);
      },
      (error) => {
        setError("Erreur lors du chargement des quizs");
        console.error(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [selectedLanguage]);

  const getLanguageName = (langKey) => {
    const languageMap = {
      french: "français",
      english: "english",
      spanish: "español",
      german: "deutsch",
      italian: "italiano",
      portuguese: "português",
      dutch: "nederlands",
      russian: "русский",
      japanese: "japanese",
      chinese: "chinese",
      korean: "korean",
    };
    return languageMap[langKey] || "français";
  };

  const handleQuizClick = (quizId) => {
    const quiz = quizzes.find((q) => q.id === quizId);
    const defaultLessonId = quiz?.questions[0]?.lessonId;
    if (defaultLessonId) {
      navigate(`/quiz/${quizId}/${defaultLessonId}`);
    } else {
      navigate(`/quiz/${quizId}`);
    }
  };

  if (loading) return <div className="p-4 text-center">Chargement des quizs...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="quiz-page-container">
      <Navbar />
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