import { useState } from "react";

export default function MultipleChoice({ question, onAnswer, feedback }) {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">{question.question}</h2>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`w-full p-3 text-left border rounded-lg transition ${
              selectedOption === option
                ? "bg-blue-100 border-blue-500"
                : "hover:bg-gray-50"
            }`}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={() => onAnswer(selectedOption)}
        disabled={!selectedOption}
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