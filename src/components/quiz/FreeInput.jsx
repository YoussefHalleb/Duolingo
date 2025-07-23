import { useState } from "react";

export default function FreeInput({ question, onAnswer, feedback, setAnswer }) {
  const [answer, setAnswerLocal] = useState("");

  const handleChange = (e) => {
    const newAnswer = e.target.value;
    setAnswerLocal(newAnswer);
    if (setAnswer) {
      setAnswer(newAnswer);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-center">{question.question}</h2>
      <input
        type="text"
        value={answer}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
        placeholder="Écrivez votre réponse..."
      />
      {feedback && (
        <>
          <p className={feedback.includes("Correct") ? "mt-4 text-green-500 font-bold text-center" : "mt-4 text-red-500 font-bold text-center"}>
            {feedback}
          </p>
          {!feedback.includes("Correct") && (
            <p className="mt-2 text-gray-700 text-center">Bonne réponse : {question.correctAnswer}</p>
          )}
        </>
      )}
    </div>
  );
}