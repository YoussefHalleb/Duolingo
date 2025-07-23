import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useParams, useNavigate } from "react-router-dom";
import MultipleChoice from "./MultipleChoice";
import FreeInput from "./FreeInput";
import MatchingSimple from "./MatchingSimple";
import { useLanguage } from "../../context/LanguageContext";

export default function QuizStandalone() {
  const { quizId, lessonId } = useParams();
  const navigate = useNavigate();
  const { selectedLanguage } = useLanguage();
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [connections, setConnections] = useState({});
  const [answer, setAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (!quizId) {
      setError("Aucun quizId fourni");
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, "quizzes", quizId),
      (docSnap) => {
        if (docSnap.exists()) {
          const quizData = { id: docSnap.id, ...docSnap.data() };
          const languageName = getLanguageName(selectedLanguage);
          const defaultLessonId = lessonId || quizData.questions[0]?.lessonId;
          const filteredQuestions = defaultLessonId
            ? quizData.questions.filter(
                (q) => q.lessonId === defaultLessonId && quizData.language === languageName
              )
            : quizData.questions.filter((q) => quizData.language === languageName);
          if (filteredQuestions.length === 0) {
            setError(
              `Aucune question trouvée pour le lessonId ${defaultLessonId} et la langue ${languageName}`
            );
          } else {
            setCurrentQuiz({ ...quizData, questions: filteredQuestions });
          }
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
  }, [quizId, lessonId, selectedLanguage]);

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
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (!isAnswered) {
      const currentQuestion = currentQuiz.questions[currentQuestionIndex];
      let userAnswer = "";
      switch (currentQuestion.type) {
        case "multiple_choice":
          userAnswer = selectedOption;
          break;
        case "free_text":
          userAnswer = answer;
          break;
        case "matching":
          userAnswer = currentQuestion.pairs.map((pair) => `${pair.word}:${connections[pair.word] || ""}`);
          break;
      }
      handleAnswer(userAnswer);
    } else if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setFeedback("");
      setIsAnswered(false);
      setSelectedOption(null);
      setConnections({});
      setAnswer("");
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setFeedback("");
    setQuizCompleted(false);
    setSelectedOption(null);
    setConnections({});
    setAnswer("");
    setIsAnswered(false);
  };

  const handleBackToList = () => {
    navigate("/quizzes");
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-red-500 mb-4">{error}</h2>
          <button
            onClick={handleBackToList}
            className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200"
          >
            Retour au Quiz
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuiz) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-500">Chargement du quiz...</p>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const scorePercentage = (score / currentQuiz.questions.length) * 100;
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold mb-4">Quiz Terminé !</h2>
          {scorePercentage >= 80 && (
            <div className="mb-4">
              <span className="text-yellow-500 text-3xl">🏆</span>
            </div>
          )}
          <div className="mb-4">
            <p className="text-4xl font-bold text-purple-600">{score}</p>
            <p className="text-gray-500">/{currentQuiz.questions.length} ({Math.round(scorePercentage)}%)</p>
          </div>
          <div className="space-x-12">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-200"
            >
              Recommencer
            </button>
            <button
              onClick={handleBackToList}
              className="px-6 py-3 bg-gray-300 text-black rounded-full hover:bg-gray-400 transition-all duration-200"
            >
              Retour aux quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-6">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-semibold text-center mb-2">{currentQuiz.title}</h1>
        <p className="text-gray-500 text-center mb-4">Testez vos connaissances en {getLanguageName(selectedLanguage)}</p>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Question {currentQuestionIndex + 1} sur {currentQuiz.questions.length}</span>
            <span>Score: {score}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-purple-600 h-2.5 rounded-full"
              style={{ width: `${((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold">{currentQuestion.questionText}</h3>
        </div>
        <div className="question-content">
          {currentQuestion.type === "multiple_choice" && (
            <MultipleChoice
              question={currentQuestion}
              onAnswer={handleAnswer}
              feedback={feedback}
              setSelectedOption={setSelectedOption}
            />
          )}
          {currentQuestion.type === "matching" && (
            <MatchingSimple
              question={currentQuestion}
              onAnswer={handleAnswer}
              feedback={feedback}
              setConnections={setConnections}
            />
          )}
          {currentQuestion.type === "free_text" && (
            <FreeInput
              question={currentQuestion}
              onAnswer={handleAnswer}
              feedback={feedback}
              setAnswer={setAnswer}
            />
          )}
        </div>
        <div className="mt-6 flex justify-center space-x-12">
          <button
            onClick={handleBackToList}
            className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200"
          >
            Retour au Quiz
          </button>
          {currentQuestion.type === "multiple_choice" && (
            <button
              onClick={handleNext}
              disabled={!selectedOption && !isAnswered}
              className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isAnswered && currentQuestionIndex < currentQuiz.questions.length - 1 ? "Continuer" : "Suivant"}
            </button>
          )}
          {currentQuestion.type === "matching" && (
            <button
              onClick={handleNext}
              disabled={!isAnswered && Object.keys(connections).length !== currentQuestion.pairs.length}
              className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isAnswered && currentQuestionIndex < currentQuiz.questions.length - 1 ? "Continuer" : "Suivant"}
            </button>
          )}
          {currentQuestion.type === "free_text" && (
            <button
              onClick={handleNext}
              disabled={!isAnswered && !answer.trim()}
              className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isAnswered && currentQuestionIndex < currentQuiz.questions.length - 1 ? "Continuer" : "Valider"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}