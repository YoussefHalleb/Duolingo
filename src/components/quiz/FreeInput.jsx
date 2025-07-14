import { useState } from "react";

export default function FreeInput({ question, onAnswer, feedback }) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    onAnswer(answer.trim());
    setAnswer("");
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">{question.question}</h2>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Écrivez votre réponse..."
      />
      <button
        onClick={handleSubmit}
        disabled={!answer.trim()}
       className="btn btn-validate"
      >
        Valider
      </button>
      {feedback && (
        <p className={feedback.includes("Correct") ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
          {feedback}
        </p>
      )}
    </div>
  );
}