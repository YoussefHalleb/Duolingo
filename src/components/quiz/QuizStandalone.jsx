import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useParams, useNavigate } from "react-router-dom";
import MultipleChoice from "./MultipleChoice";
import FreeInput from "./FreeInput";
import MatchingSimple from "./MatchingSimple";
import "./Quiz.css";

export default function QuizStandalone() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "quizzes", quizId),
      (docSnap) => {
        if (docSnap.exists()) {
          setCurrentQuiz({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Quiz non trouvé");
        }
      },
      (error) => {
        setError("Erreur lors du chargement du quiz");
        console.error(error);
      }
    );

    return () => unsubscribe();
  }, [quizId]);

  const handleAnswer = (userAnswer) => {
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    let isCorrect = false;

    switch (currentQuestion.type) {
      case "multiple_choice":
        isCorrect = userAnswer === currentQuestion.correctAnswer;
        break;
      case "free_text":
        isCorrect = userAnswer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim();
        break;
      case "matching":
        const correctPairs = currentQuestion.pairs.map((p) => `${p.word}:${p.translation}`);
        isCorrect = userAnswer.every((answer) => correctPairs.includes(answer)) && userAnswer.length === correctPairs.length;
        break;
    }

    setFeedback(isCorrect ? "Correct !" : "Incorrect, essayez encore.");
    if (isCorrect) setScore(score + 1);

    setTimeout(() => {
      if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setFeedback("");
      } else {
        setQuizCompleted(true);
      }
    }, 800);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setFeedback("");
    setQuizCompleted(false);
  };

  const handleBackToList = () => {
    navigate("/quizzes");
  };

  if (error) {
    return (
      <section className="section bg-light min-vh-100 d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7 text-center">
              <div className="error-content p-3 rounded-lg shadow-sm bg-white animate__animated animate__fadeIn">
                <h2 className="text-danger mb-3">{error}</h2>
                <button onClick={handleBackToList} className="btn btn-primary">
                  <i className="fas fa-arrow-left me-1"></i> Retour aux quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!currentQuiz) {
    return (
      <section className="section bg-light min-vh-100 d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
              <p className="mt-2 text-muted">Chargement du quiz...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (quizCompleted) {
    const scorePercentage = (score / currentQuiz.questions.length) * 100;
    return (
      <section className="section bg-light min-vh-100 d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7">
              <div className="quiz-completed-card p-3 rounded-lg shadow-sm bg-white text-center animate__animated animate__bounceIn">
                <h2 className="quiz-title mb-3">Quiz Terminé !</h2>
                {scorePercentage >= 80 && (
                  <div className="celebration mb-3">
                    <i className="fas fa-trophy fa-2x text-warning animate__animated animate__pulse animate__infinite"></i>
                  </div>
                )}
                <div className="score-display p-3 rounded-lg bg-light shadow-sm mb-3">
                  <p className="score-text mb-2">
                    {score}
                    <span className="text-muted">/{currentQuiz.questions.length}</span>
                  </p>
                  <p className="text-muted">Votre score final ({Math.round(scorePercentage)}%)</p>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
                  <button onClick={handleRestart} className="btn btn-primary">
                    <i className="fas fa-redo-alt me-1"></i> Recommencer
                  </button>
                  <button onClick={handleBackToList} className="shovel btn btn-outline-secondary">
                    <i className="fas fa-arrow-left me-1"></i> Retour aux quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  return (
    <section className="section bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div className="quiz-card p-3 rounded-lg shadow-sm bg-white animate__animated animate__fadeIn">
              <h1 className="quiz-title mb-2">{currentQuiz.title}</h1>
              <p className="text-muted mb-3">Testez vos connaissances</p>

              <div className="progress-container mb-2">
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted font-weight-medium">
                    Question {currentQuestionIndex + 1} sur {currentQuiz.questions.length}
                  </span>
                  <span className="font-weight-bold text-primary">Score: {score}</span>
                </div>
                <div className="progress h-3 rounded-pill">
                  <div
                    className="progress-bar bg-gradient-primary"
                    style={{
                      width: `${((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <hr className="section-divider" />

              <div className="question-card p-3 rounded-lg bg-light shadow-sm mb-3 animate__animated animate__fadeInUp">
                <h3 className="question-text mb-3">{currentQuestion.questionText}</h3>

                <div className="question-content">
                  {currentQuestion.type === "multiple_choice" && (
                    <MultipleChoice
                      question={currentQuestion}
                      onAnswer={handleAnswer}
                      feedback={feedback}
                    />
                  )}

                  {currentQuestion.type === "matching" && (
                    <MatchingSimple
                      question={currentQuestion}
                      onAnswer={handleAnswer}
                      feedback={feedback}
                    />
                  )}

                  {currentQuestion.type === "free_text" && (
                    <FreeInput
                      question={currentQuestion}
                      onAnswer={handleAnswer}
                      feedback={feedback}
                    />
                  )}
                </div>
              </div>

              {feedback && (
                <div
                  className={`feedback-message p-2 rounded-lg text-center font-weight-medium animate__animated animate__bounceIn ${
                    feedback.includes("Correct")
                      ? "bg-success-light text-success border-success"
                      : "bg-danger-light text-danger border-danger"
                  }`}
                >
                  <i
                    className={`fas fa-${
                      feedback.includes("Correct") ? "check-circle" : "times-circle"
                    } me-1`}
                  ></i>
                  <p className="mb-0">{feedback}</p>
                </div>
              )}

              <div className="d-flex justify-content-between align-items-center mt-3">
                <button
                  onClick={handleBackToList}
                  className="btn btn-outline-secondary"
                >
                  <i className="fas fa-arrow-left me-1"></i> Retour aux quiz
                </button>
                <span className="text-muted">
                  Question {currentQuestionIndex + 1}/{currentQuiz.questions.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}