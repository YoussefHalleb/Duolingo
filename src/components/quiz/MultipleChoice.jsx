import { useState } from "react";

export default function MultipleChoice({ question, onAnswer, feedback, setSelectedOption }) {
  const [selectedOption, setSelectedOptionLocal] = useState(null);
  
  const handleOptionSelect = (option) => {
    setSelectedOptionLocal(option);
    if (setSelectedOption) {
      setSelectedOption(option);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-center">{question.question}</h2>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`p-3 text-left rounded-lg border transition-colors mx-8 ${
              selectedOption === option
                ? "bg-purple-100 border-purple-500 text-purple-800"
                : "bg-gray-50 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
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